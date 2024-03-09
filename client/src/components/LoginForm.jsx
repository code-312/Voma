import React, { useState, useContext } from 'react';
import ApiError from './ApiError';
import { AuthContext } from '../lib/AuthProvider';
import {ButtonStyle} from '../styles/components/Button.style'
import StyledForm from '../styles/components/StyledForm.style'
import { StyledInput, StyledLabel } from '../styles/components/Input.style'


export default function LoginForm() {
    const AuthUser = useContext(AuthContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (email.length && password.length) {
            AuthUser.login(email, password);
        }
    }

    return (
    <>
        {AuthUser.loginFormError &&
            <ApiError message="Unable to verify credentials, please try again." />
        }

        <StyledForm onSubmit={handleSubmit}>
            <StyledLabel htmlFor="input-email">Email</StyledLabel>
            <StyledInput
                id="input-email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="volunteer@gmail.com"
                autoComplete="off"
            />

            <StyledLabel htmlFor="input-password">Password</StyledLabel>
            <StyledInput
                id="input-password"
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? 'text' : 'password'}
                autoComplete="off"
                // <IconButton
                //     aria-label="toggle password visibility"
                //     onClick={handleClickShowPassword}
                //     onMouseDown={handleMouseDownPassword}
                //     edge="end">
                //     {showPassword ? <VisibilityOff /> : <Visibility />}
                // </IconButton>
            />

            <ButtonStyle
                type="submit"
                disabled={!email.length || !password.length}
                variant="contained"
            >
                Login
            </ButtonStyle>
        </StyledForm>
    </>
    )
}
