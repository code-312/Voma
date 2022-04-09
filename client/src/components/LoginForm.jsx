import React, { useState, useContext } from 'react';
import { Grid, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button, Container } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { makeStyles } from '@mui/styles';

import { AuthContext } from '../lib/AuthProvider';

const useStyles = makeStyles({
    LoginFormBox: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 4,
        boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.12), 0px 1px 3px rgba(0, 0 , 0, 0.2);',
    },
    input: {
        marginBottom: 32,
        display: 'flex',
        flexWrap: 'nowrap',
        maxWidth: 328,
    }
});

export default function LoginForm() {
    const AuthUser = useContext(AuthContext);

    const classes = useStyles();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid container justify="center" spacing={1}>
            <Grid item sm={3} md={4} xs={0} />
            <Grid item sm={6} md={4} xs={12}>
                <Typography variant="h4" mb='16px' noWrap>Welcome!</Typography>
                <Container direction="column" className={classes.LoginFormBox}>
                    <Typography variant="h6" mb='16px' noWrap>Login</Typography>
                    <form>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel htmlFor="input-email">Email</InputLabel>
                            <OutlinedInput 
                                id="input-email"
                                className={classes.input}
                                variant="outlined"
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="volunteer@gmail.com"
                                autoComplete="off"
                                label="Email" />
                        </FormControl>

                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel htmlFor="input-password">Password</InputLabel>
                            <OutlinedInput
                                id="input-password"
                                className={classes.input}
                                variant="outlined"
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                label="Password"
                                autoComplete="off"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton 
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                } />
                        </FormControl>
                    </form>
                    <Button 
                        disabled={!email.length || !password.length}
                        onClick={(email.length && password.length) ? () => AuthUser.login(email, password) : null}
                        variant="contained">Login</Button>

                </Container>
            </Grid>
        </Grid>
    )
}