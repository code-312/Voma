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

    function login() {}
    
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