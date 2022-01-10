import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Home from '../pages/Home';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
<<<<<<< HEAD
// import NoOnboarding from '../pages/NoOnboarding';
=======
>>>>>>> dd21c9dc780fbd4da0874a688dea04efa8ad66b8
import PageNotFound from '../pages/PageNotFound';

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
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="*">
          <PageNotFound />
        </Route>
      </Switch>
    </HelmetProvider>
  );
}

export default App;
