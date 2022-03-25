import React, { useState } from 'react';
import { Grid, Card, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Button } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function LoginForm() {
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <Grid container justify="center">
            <Grid item md={3} />
            <Grid item md={6}>
                <Typography variant="h4" noWrap>Welcome!</Typography>
                <Card direction="column" className="LoginForm">
                    <Typography variant="h6" noWrap>Login</Typography>
                    <form>
                        <FormControl>
                            <InputLabel htmlFor="input-email">Email</InputLabel>
                            <OutlinedInput 
                                id="input-email"
                                value={values.email}
                                variant="outlined"
                                placeholder="volunteer@gmail.com"
                                autoComplete="off"
                                label="Email" />
                        </FormControl>

                        <FormControl>
                            <InputLabel htmlFor="input-password">Password</InputLabel>
                            <OutlinedInput
                                id="input-password"
                                value={values.password}
                                variant="outlined"
                                type={values.showPassword ? 'text' : 'password'}
                                label="Password"
                                autoComplete="off"
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton 
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end">
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                } />
                        </FormControl>
                    </form>
                    <Button variant="contained">Login</Button>

                </Card>
            </Grid>
        </Grid>
    )
}