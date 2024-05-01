import React, { useState, createContext, useEffect } from "react";
import { addNewItem, deleteItem } from "./util";

const VolunteerContext = createContext(null);

function VolunteerProvider({ children }) {
  // Use localstorage for the moment until we get Sessions figured out.
  const storedProfile = localStorage.getItem('volunteer');
  const storedRegistrationStep = localStorage.getItem('registrationStep');

  let defaultProfile = {
      isAuthenticated: false,
      notRegistered: false,
      email: '',
      skills: '',
      pronouns: '',
      timeslots: []
  };
  let defaultRegistrationStep = -1;

  if (storedProfile) { // If profile is in localstorage, use that.
    defaultProfile = JSON.parse(storedProfile);
  }

  if (storedRegistrationStep) {
    defaultRegistrationStep = parseInt(storedRegistrationStep, 10); // Force integer type.
  }

  const [profile, setProfile] = useState(defaultProfile);
  const [registrationStep, setRegistrationStep] = useState(defaultRegistrationStep);
  const [registrationErrorMessage, setRegistrationErrorMessage] = useState('');

  function updateInfo(info) {
    let p = {};
    p = Object.assign(profile, info);
    setProfile(p);
    localStorage.setItem('volunteer', JSON.stringify(p));
  };

  /**
   * Check if this email is signed up for the CFC Slack workspace.
   *
   * @param {string} volunteerEmail
   */
  const slackExists = (email) => {
    fetch(`/api/volunteer/slack`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((data) => {
      if (data.status === 404) {
        console.log(data);
        throw new Error('404: Route not found.');
      } else return data.json();
    })
    .then((response) => {
      let profileUpdate = {};

      if (response.exists) {  // User found.
        profileUpdate = Object.assign(profile, {
          isAuthenticated: true,
          email,
          notRegistered: false,
          suid: response.suid,
          name: response.name,
          timeslots: []
        });
        updateInfo(profileUpdate);
        setRegistrationStep(1);

      } else {
        profileUpdate = Object.assign(profile, {
          isAuthenticated: false,
          notRegistered: true,
          email: '',
          skills: '',
          pronouns: '',
          timeslots: []
        });
        updateInfo(profileUpdate);
        setRegistrationStep(1)
      }

    })
    .catch((err) => {
      console.log(err);

      // For now, fake successful return of profile.
      console.log('Faking successful signin for now, for development.');
      const profileUpdate = Object.assign(profile, {
        isAuthenticated: true,
        email,
        notRegistered: false,
        suid: 'FAKE_API_USER',
        name: 'Fake User',
      });
      updateInfo(profileUpdate);
      setRegistrationStep(1);
      // \fake successful return of profile.
    });
  };

  const registerVolunteer = () => {
    fetch(`/api/volunteer`, {
      method: 'POST',
      body: JSON.stringify({
        name: profile.name,
        email: profile.email,
        slackUserId: profile.suid,
        pronouns: profile.pronouns,
        skills: profile.skills,
        timeslots: profile.timeslots
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((data) => {
      if (data.status === 404) {
        setRegistrationErrorMessage('Oops, something went wrong. Please reach out on Slack for help registering.');
        window.scrollY = 0;

        throw new Error('404: Route not found.');
      } else return data.json();
    })
    .then(response => {
      if (response.success) {
        setRegistrationStep(4);
      } else {
        console.log(response);
        setRegistrationErrorMessage('Oops, something went wrong. Please reach out on Slack for help registering.');
        window.scrollY = 0;
      }
    })
    .catch((err) => {
      console.log(err);
      setRegistrationErrorMessage('Oops, something went wrong. Please reach out on Slack for help registering.');
      window.scrollY = 0;
    });
  };

  useEffect(() => {
    localStorage.setItem('registrationStep', registrationStep);
  }, [registrationStep]);

  useEffect(() => {
    localStorage.setItem('volunteer', JSON.stringify(profile));
  }, [profile]);

  const funcs = {
    setProfile,
    slackExists,
    setRegistrationStep,
    updateInfo,
    registerVolunteer,
  };

  return (
    <VolunteerContext.Provider value={{ ...profile, registrationStep, registrationErrorMessage, ...funcs}}>
        {children}
    </VolunteerContext.Provider>
  );
}

export { VolunteerProvider, VolunteerContext };

