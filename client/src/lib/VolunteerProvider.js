
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
    };
  }
  
  const [profile, setProfile] = useState(defaultProfile);

  const signIn = (volunteerEmail) => {
    fetch('/api/user/find', {
      method: 'POST',
      body: JSON.stringify({ volunteerEmail }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then((res) => {
      if (res.status === 404) {

        // Use localstorage for the moment until we get Sessions figured out.
        localStorage.setItem('volunteer', JSON.stringify(profile));

        throw new Error('API 404');

      } else return res.json();
    })
    .then((json) => {

      const updatedProfile = {
        isAuthenticated: true,
        email: volunteerEmail,
        notRegistered: false,
      };
      setProfile(updatedProfile);
      // Use localstorage for the moment until we get Sessions figured out.
      localStorage.setItem('volunteer', JSON.stringify(updatedProfile));
    })
    .catch((err) => {
      console.log(err);

      // For now, fake successful return of profile.
      console.log('Faking successful signin for now, for development.');

      const updatedProfile = {
        isAuthenticated: true,
        email: volunteerEmail,
        notRegistered: false,
      };
      setProfile(updatedProfile);
      // Use localstorage for the moment until we get Sessions figured out.
      localStorage.setItem('volunteer', JSON.stringify(updatedProfile));

    });
  };
  
  const value = { 
    profile, 
    setProfile,
    signIn, 
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

