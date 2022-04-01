import { Button } from '@mui/material';

export default function LoginToggleButton() {
    const loggedIn = true; // Update when user is added.

    return (<>
        {loggedIn && <Button color="inherit">Sign In</Button>}
        {!loggedIn && <Button color="inherit">Sign Out</Button>}
    </>)
}