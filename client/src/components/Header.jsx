import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useLocation, Link } from 'react-router-dom';
import LoginToggleButton from './LoginToggleButton';
import { AuthContext } from '../lib/AuthProvider';

const useStyles = makeStyles({
    headerLinkContainer: {
        justifySelf: 'flex-start',
        flex: 1,
        display: 'flex',
        alignItems: 'center'
    },
    appLogo: {
        padding: '15px',
        marginRight: '35px'
    },
    headerLink: {
      color: 'white',
      textDecoration: 'none',
      padding: '15px',
      '&.active': {
          fontWeight: 'bold'
      }
    },
  });

export default function Header() {
    const UserAuth = useContext(AuthContext);
    const location = useLocation();
    const registering = { form: false };
    let volPage = false;
    let projectPage = false;

    switch (location.pathname) {
        case '/': 
        case '/register':
            registering.form = true;
            break;
        case '/board':
            volPage = true;
            break;
        case '/projects':
            projectPage = true;
            break;
        default: break;
    }

    const classes = useStyles();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <div className={classes.headerLinkContainer}>
                        <Typography variant="h6" noWrap component="div" class={classes.appLogo}>
                            {registering.form ? 'Code for Chicago' : 'Voma'}
                        </Typography>
                        { UserAuth.isAuthenticated() &&
                            <>
                                <Link className={volPage ? `active ${classes.headerLink}` : classes.headerLink} to='/board'>Volunteers</Link>
                                <Link className={projectPage ? `active ${classes.headerLink}` : classes.headerLink} to='/projects'>Projects</Link>
                            </>
                        }
                    </div>
                    
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