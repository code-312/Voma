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
  let defaultRegistrationStep = 1;

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
      console.log(data);
      if (data.status !== 200) {
        console.log(data);
        throw new Error('404: Route not found.');
      } else return data.json();
    })
    .then((response) => {

      if (response.exists) {  // User found.
        const slackProfile = {
          isAuthenticated: true,
          email,
          notRegistered: false, 
          suid: response.suid,
          name: response.name,
//          img:  response.img,
        };
        updateInfo(slackProfile);

      } else {

        const updatedProfile = {
          isAuthenticated: false,
          notRegistered: true, 
        };
        updateInfo(updatedProfile); 
      }

    })
    .catch((err) => {
      console.log(err);

      // For now, fake successful return of profile.
      console.log('Faking successful signin for now, for development.');
      const updatedProfile = {
        isAuthenticated: true,
        email,
        notRegistered: false,
        suid: 'FAKE_API_USER',
        name: 'Fake User',
//        img:  'https://.../T6WU86LJZ-U01TD0E2MC5-4a4a68c96004-512',
      };
      setProfile(updatedProfile);
    });
  };

  const registerVolunteer = () => {

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

