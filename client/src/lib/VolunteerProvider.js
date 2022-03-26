import React, { useState, createContext, useContext } from "react";
import { Route, Redirect } from 'react-router-dom';

const VolunteerContext = createContext(null);

function VolunteerProvider({ children }) {
  // Use localstorage for the moment until we get Sessions figured out.
  const storedProfile = localStorage.getItem('volunteer');
  let defaultProfile = {};
  if (storedProfile) { // If profile is in localstorage, use that.
    defaultProfile = JSON.parse(storedProfile);
  } else {
    defaultProfile = {
      isAuthenticated: false,
      notRegistered: false,
      email: '',
      registrationStep: 0,
    };
  }
  
  const [profile, setProfile] = useState(defaultProfile);

  /**
   * Check if this email is signed up for the CFC Slack workspace.
   * 
   * @param {string} volunteerEmail 
   */
  const slackExists = (volunteerEmail) => {
    fetch(`http://localhost:5000/api/volunteer/slack/exists`, {
      method: 'POST',
      body: JSON.stringify({ 
        email: volunteerEmail 
      }),
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

      if (response.exists) {  // User found.
        const slackProfile = {
          isAuthenticated: true,
          email: volunteerEmail,
          notRegistered: false, 
          suid: response.suid,
          name: response.name,
          img:  response.img,
        };
        
        setProfile(slackProfile);
        // Use localstorage for the moment until we get Sessions figured out.
        localStorage.setItem('volunteer', JSON.stringify(slackProfile));
      } else {

        const updatedProfile = {
          isAuthenticated: false,
          email: volunteerEmail,
          notRegistered: true, 
          registrationStep: 0,
        };
        setProfile({});
        setProfile(updatedProfile); 
        // Use localstorage for the moment until we get Sessions figured out.
        localStorage.setItem('volunteer', JSON.stringify(updatedProfile));
      }

    })
    .catch((err) => {
      console.log(err);

      // For now, fake successful return of profile.
      console.log('Faking successful signin for now, for development.');
      const updatedProfile = {
        isAuthenticated: true,
        email: volunteerEmail,
        notRegistered: false,
        suid: 'FAKE_API_USER',
        name: 'Fake User',
        img:  'https://.../T6WU86LJZ-U01TD0E2MC5-4a4a68c96004-512'
      };
      setProfile(updatedProfile);
      // Use localstorage for the moment until we get Sessions figured out.
      localStorage.setItem('volunteer', JSON.stringify(updatedProfile));

    });
  };

  const clearProfile = () => {
    setProfile({});
    setProfile({
      isAuthenticated: false,
      notRegistered: false,
      email: '',
      registrationStep: 0,
    });
    // Use localstorage for the moment until we get Sessions figured out.
    localStorage.removeItem('volunteer');
  }
  
  const value = { 
    profile, 
    setProfile,
    slackExists, 
    clearProfile,
  };

  return (
    <VolunteerContext.Provider value={value}>
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

