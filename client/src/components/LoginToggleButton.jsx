import { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from '@mui/material';

import { AuthContext } from '../lib/AuthProvider';

export default function LoginToggleButton() {
    const UserAuth = useContext(AuthContext);

    return (<>
        {!UserAuth.isAuthenticated() && 
            <Button color="inherit"
                onClick={() => (<Redirect to="/login" />)}>
                Sign In
            </Button>
        }
        {UserAuth.isAuthenticated() && 
            <Button color="inherit"
                onClick={() => UserAuth.logout()}>
                Sign Out
            </Button>
        }
    </>)
}