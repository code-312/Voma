import { useState, createContext, useContext } from "react";
import { Route, Redirect } from 'react-router-dom';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
  const storedAuth = localStorage.getItem('auth');
  let defaultAuth = { authenticated: false };
  if (storedAuth) {
    defaultAuth = JSON.parse(storedAuth);
  }

  // Actual authentiation is stored in the cookie. Actions are validated serverside. 
  const [auth, setAuth] = useState(defaultAuth);
  const [loginFormError, setLoginFormError] = useState(false);

  function isAuthenticated() {
    return auth.authenticated;
  }
  
  function setAuthentication(authState) {
    localStorage.setItem('auth', JSON.stringify(authState));
    setAuth(authState);
  }

  const login = (email, password) => {
    fetch(`/api/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then((data) => {
        if (data.status === 404) {
          setAuthentication({ authenticated: false });
          setLoginFormError(true);

          throw new Error('Unable to find server.');

        } else return data.json();
      })
      .then(response => {
        if (response.success) {
          setAuthentication({ authenticated: true });
          window.location.href = '/board';

        } else {
          console.log(response);
          setAuthentication({ authenticated: false });
          setLoginFormError(true);
        }
      })
      .catch((err) => {
        console.log(err);
        setAuthentication({ authenticated: false });
        setLoginFormError(true); 
      });
  };

  function logout() {
    setAuthentication({ authenticated: false });
    fetch(`/api/logout`);
    window.location.href = '/login';
  }

  const funcs = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={{ ...funcs, auth, loginFormError }}>
      {children}
    </AuthContext.Provider>
  );
}

function LockedRoute({ children, ...rest }) {
  const UserAuth = useContext(AuthContext);
  return (
    <Route {...rest}
      render={({ location }) => UserAuth.isAuthenticated() ? (children) : (<Redirect to={{ pathname: "/", state: { from: location } }} />)}
    />
  );
}

export { AuthProvider, AuthContext, LockedRoute };