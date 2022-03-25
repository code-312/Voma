import React, { useState, useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PageNotFound from '../pages/PageNotFound';

import { VolunteerProvider, LockedRoute } from '../lib/VolunteerProvider'

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <HelmetProvider>
      <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <VolunteerProvider>
        <Switch>
          <Route exact path="/">
          {loggedIn ? <Redirect to="/register" /> : <Home />}
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <LockedRoute path="/dashboard">
            <Dashboard />
          </LockedRoute>
          <Route path="*">
            <PageNotFound />
          </Route>
        </Switch>
      </VolunteerProvider>
    </HelmetProvider>
  );
}

export default App;
