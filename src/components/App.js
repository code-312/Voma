import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from '../pages/Home';
import Register from '../pages/Register';

const GlobalStyle = createGlobalStyle`
    input[type=text] {
    display: block;
  }

`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </>
  );
}

export default App;
