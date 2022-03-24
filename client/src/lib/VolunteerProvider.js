
import React, { useState, createContext, useContext } from "react";

const VolunteerContext = createContext(null);

function VolunteerProvider({ children }) {
  const [profile, setProfile] = useState({
    isAuthenticated: false,
    exists: null,
    email: '',
  });

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

        // Setting not exists on 404?
        const currentProfile = profile;
        currentProfile.exists = false;
        setProfile(currentProfile);

        throw new Error('API 404');

      } else return res.json();
    })
    .then((json) => {
      setProfile({
        isAuthenticated: true,
        email: volunteerEmail,
        exists: true,
      });
    })
    .catch((err) => {
      console.log(err);

      // For now, fake successful return of profile.
      console.log('Faking successful signin for now, for development.');
      setProfile({
        isAuthenticated: true,
        exists: true,
        email: volunteerEmail,
      });
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

export { VolunteerProvider, VolunteerContext };

