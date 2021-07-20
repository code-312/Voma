import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Home from '../pages/Home';
import Register from '../pages/Register';

const GlobalStyle = createGlobalStyle`
  :root {
    --warning-color: #e20606;
  }

  input[type=text] {
    display: block;
  }

  button {
    border: 2px solid gray;
    border-radius: 3px;
    padding: 10px;
    margin: 1rem 1rem 0 0;
    cursor: pointer;

  }

  .inactive {
    border-color: #9e9c9c;
    color: gray;
    cursor: not-allowed;
  }

  .warning {
    color: var(--warning-color);
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
