import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Register from '../pages/Register';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
    </Switch>
  )
}

export default App;
