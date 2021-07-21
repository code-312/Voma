import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Helmet } from 'react-helmet';
import Home from '../pages/Home';
import Register from '../pages/Register';

const GlobalStyle = createGlobalStyle`
  && {
    :root {
      --warning-color: #e20606;
    }

    input[type=text] {
      display: block;
    }

    button {
      border: 2px solid gray;
      border-radius: 3px;
      font-size: 1.1rem;
      padding: 12px 14px;
      margin: 1rem 1rem 0 0;
      cursor: pointer;
    }

    button.inactive {
      border-color: #9e9c9c;
      color: gray;
      cursor: not-allowed;
    }

    .warning {
      color: var(--warning-color);
    }
  }
`;

function App() {
  return (
    <>
      <GlobalStyle />
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
      </Switch>
    </>
  );
}

export default App;
