import styled from 'styled-components';

export const ButtonStyle = styled.button`

   ${({ variant }) =>
    variant === 'solid blue' &&
    `
    background-color: var(--uiBlue);
    color: var(--white);
    border: none;
    display: inline;
  `}

   ${({ variant }) =>
    variant === 'solid white' &&
    `
    background-color: var(--lightBlueGrey);
    color: var(--blueShade2);
    border: none;
  `}

   ${({ variant }) =>
    variant === 'solid red' &&
    `
    background-color: var(--uiError);
    color: var(--white);
    border: none;
  `}

   ${({ variant }) =>
    variant === 'outline blue' &&
    `
    color: var(--uiBlue);
    border: 2px solid var(--uiBlue);
  `}

   ${({ variant }) =>
    variant === 'fw outline blue' &&
    `
    color: var(--uiBlue);
    border: 2px solid var(--uiBlue);
    width: 100%;
  `}

   ${({ variant }) =>
    variant === 'fw outline white' &&
    `
    background-color: var(--lightBlueGrey);
    color: var(--blueShade2);
    border: 2px solid var(--blueShade2);
    width: 100%;
  `}

   ${({ variant }) =>
    variant === 'text-only red' &&
    `
    color: var(--uiError);
    text-decoration-line: underline;
    border: none;
  `}

  .button-icon {
    width: 2.25rem;
    height: 2.25rem;
  }
`;
