import styled from 'styled-components';

export const StyledInput = styled.input`
  margin-top: 0.25rem;
  height: 3.5rem;
  padding: 1rem 0.75rem;
  border: 0.5px solid var(--blueShade2);
  border-radius: 3px;
  width: 100%;
  font-size: 1rem;
  font-family: 'Outfit', sans-serif;
  &::placeholder {
    color: var(--blueShade2);
  }
`;

export const StyledLabel = styled.label`
  font-size: 1rem;
  color: var(--blueShadeIII);
  span {
    margin-left: 0.25rem;
    font-size: 0.875rem;
    color: var(--warning-color);
  }
`;

export const PasswordWrapper = styled.div`
  position: relative;
  display: flex;

  button {
    font-size: 1.75rem;
    z-index: 50;
    position: absolute;
    right: 0;
    top: 0.5rem;
    color: var(--blueShade3);
    &:hover {
      color: var(--uiBlue);
    }
  }
`;
