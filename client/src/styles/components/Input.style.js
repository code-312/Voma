import styled from 'styled-components';

export const StyledInput = styled.input`
    height: 56px;
    padding: 16px 12px;
    border: 0.5px solid var(--blueShade2);
    border-radius: 3px;
    width: 100%;
    font-size: 16px;
    &::placeholder {
        color: var(--blueShade2);
    }
`;

export const StyledLabel = styled.label`
    font-size: 16px;
;`

export const PasswordWrapper = styled.div`
    position: relative;
    svg {
        position: absolute;
        z-index: 50;
        right: 12px;
        top: 14px;
        cursor: pointer;
        color: var(--blueShade3);
    }
`;
