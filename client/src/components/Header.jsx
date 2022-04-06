import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import LoginToggleButton from './LoginToggleButton';

export default function Header() {
    const location = useLocation();
    const registering = { form: false };

    switch (location.pathname) {
        case '/': 
        case '/register':
            registering.form = true;
            break;

        default: break;
    }

    return (
        <Box mb="32px" sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
                        {registering.form ? 'Code for Chicago' : 'Voma'}
                    </Typography>
                    
                    {registering.form && 
                        'Social Button Here'
                    }

                    {!registering.form &&
                        <LoginToggleButton />
                    }

                </Toolbar>
            </AppBar>
        </Box>
    )
}