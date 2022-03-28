import React, { useState, createContext, useContext, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';

const VolunteerContext = createContext(null);

function VolunteerProvider({ children }) {
  // Use localstorage for the moment until we get Sessions figured out.
  const storedProfile = localStorage.getItem('volunteer');
  const storedRegistrationStep = localStorage.getItem('registrationStep');
  
  let defaultProfile = {
      isAuthenticated: false,
      notRegistered: false,
      email: '',
      skill: '',
      pronouns: '',
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

  const updateInfo = (info) => {
    const p = profile;
    Object.keys(info).forEach((key, index) => {
      p[key] = info[key];
    });
    setProfile(p);
  };

  /**
   * Check if this email is signed up for the CFC Slack workspace.
   * 
   * @param {string} volunteerEmail 
   */
  const slackExists = (email) => {
    fetch(`http://localhost:5000/api/volunteer/slack/exists`, {
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
      const profileUpdate = profile;

      if (response.exists) {  // User found.
        Object.assign(profileUpdate, {
          isAuthenticated: true,
          email,
          notRegistered: false, 
          suid: response.suid,
          name: response.name,
        });
        setProfile(profileUpdate);
        setRegistrationStep(1);

      } else {
        Object.assign(profileUpdate, {
          isAuthenticated: false,
          notRegistered: true, 
        });
        setProfile(profileUpdate); 
        setRegistrationStep(1)
      }

    })
    .catch((err) => {
      console.log(err);

      // For now, fake successful return of profile.
      console.log('Faking successful signin for now, for development.');

      const profileUpdate = profile;
      Object.assign(profileUpdate, {
        isAuthenticated: true,
        email,
        notRegistered: false,
        suid: 'FAKE_API_USER',
        name: 'Fake User',
      })
      setProfile(profileUpdate);
      setRegistrationStep(1);
    });
  };

  const registerVolunteer = () => {
    fetch(`http://localhost:5000/api/volunteer/create`, {
      method: 'POST',
      body: JSON.stringify({
        name: profile.name,
        email: profile.email,
        slackUserId: profile.suid,
        pronouns: profile.pronouns,
        skill: profile.skill,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((data) => {
      if (data.status === 404) {
        throw new Error('404: Route not found.');
      } else return data.json();
    })
    .catch((err) => {
      console.log(err);
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
    <VolunteerContext.Provider value={{ ...profile, registrationStep, ...funcs}}>
        {children}
    </VolunteerContext.Provider>
  );
}

function LockedRoute({ children, ...rest }) {
  const authContext = useContext(VolunteerContext);

  return (
    <Route {...rest}
      render={({ location }) => authContext.profile.isAuthenticated ? ( children ) : (
          <Redirect to={{ pathname: "/", state: { from: location } }} />
        )
      }
    />
  );
}

export { VolunteerProvider, VolunteerContext, LockedRoute };

