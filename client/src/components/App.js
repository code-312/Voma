import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import PageNotFound from '../pages/PageNotFound';
import Login from '../pages/Login';

import { VolunteerProvider } from '../lib/VolunteerProvider';
import { LockedRoute } from '../lib/AuthProvider';

function App() {

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
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        {/* Logged In */}
        <LockedRoute path="/dashboard">
          <Dashboard />
        </LockedRoute>

        {/* Registration Form */}
        <VolunteerProvider>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
        </VolunteerProvider>

        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </HelmetProvider>
  );
}

export default App;
