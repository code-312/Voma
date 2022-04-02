import { useState, createContext, useContext, useEffect } from "react";
import { Route, Redirect } from 'react-router-dom';

const AuthContext = createContext(null);

function AuthProvider({ children }) {
    const [auth, setAuth] = useState({ // Private.
        authenticated: true, // true for testing/development.
    });

    const [profile, setProfile] = useState({ // User Profile.
        name: 'Adam',
    });

    const isAuthenticated = () => auth.authenticated;

    const funcs = {
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={{ ...funcs }}>
            {children}
        </AuthContext.Provider>
    );
}

function LockedRoute({ children, ...rest }) {
    const UserAuth = useContext(AuthContext);
    return (
        <Route {...rest}
            render={
                ({ location }) => 
                UserAuth.isAuthenticated() ? (children) : 
                <Redirect to={{ 
                    pathname: "/", 
                    state: { from: location } 
                }} />
            }
        />
    );
}

export { AuthProvider, AuthContext, LockedRoute};