import { useState, createContext, useContext } from "react";
import { Route, Redirect } from 'react-router-dom';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ 
        authenticated: true, // true for testing/development.
    });

    // const [profile, setProfile] = useState({ 
    //     name: '',
    // });

    function isAuthenticated() {
        return auth.authenticated;
    }

    const login = (email, password) => {
        fetch(`http://localhost:5000/api/login`, {
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
            throw new Error('404');

          } else return data.json();
        })
        .then(response => {
          if (response.success) {
            setAuth({
              authenticated: true,
            });
            window.location.href = '/board';
              
          } else {
            console.log(response);

          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    
    function logout() {
        setAuth({
            authenticated: false,
        });
    }

    const funcs = {
        isAuthenticated,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={{ ...funcs, auth }}>
            {children}
        </AuthContext.Provider>
    );
}

function LockedRoute({ children, ...rest }) {
    const UserAuth = useContext(AuthContext);
    return (
        <Route {...rest}
            render={  ({ location }) => UserAuth.isAuthenticated() ? (children) : (<Redirect to={{ pathname: "/", state: { from: location } }} />)  }
        />
    );
}

export { AuthProvider, AuthContext, LockedRoute };