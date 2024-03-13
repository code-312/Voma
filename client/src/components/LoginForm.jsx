import React, { useState, useContext } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import ApiError from './ApiError';
import { AuthContext } from '../lib/AuthProvider';
import {ButtonStyle} from '../styles/components/Button.style'
import StyledForm from '../styles/components/StyledForm.style'
import { StyledInput, StyledLabel, PasswordWrapper } from '../styles/components/Input.style'


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
            <h2>
              Sign In
              <span>Please sign in to continue</span>
            </h2>
            <StyledLabel htmlFor="input-email">Email <span>(required)</span>
                <StyledInput
                    id="input-email"
                    variant="outlined"
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="volunteer@gmail.com"
                    autoComplete="off"
                />
            </StyledLabel>

            <StyledLabel htmlFor="input-password">Password <span>(required)</span>
                <PasswordWrapper>
                    <StyledInput
                        id="input-password"
                        onChange={(e) => setPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="off"
                    />
                    <button
                        type="button"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {showPassword ? <Eye /> : <EyeOff />}
                    </button>
                </PasswordWrapper>
            </StyledLabel>
            <ButtonStyle
                type="submit"
                disabled={!email.length || !password.length}
                variant={(!email.length || !password.length) ? 'solid white' : 'solid blue'}
            >
                Sign In
            </ButtonStyle>
        </StyledForm>
    </>
    )
}
