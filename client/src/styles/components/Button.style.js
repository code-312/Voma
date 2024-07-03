import styled from 'styled-components';

export const ButtonStyle = styled.button`
  ${({ variant }) =>
    variant === 'solid blue' &&
    `
    background-color: var(--uiBlue);
    color: var(--white);
    border: none;
    display: inline;
    :not(:disabled):hover {
      filter: brightness(0.9);
    }
    &:disabled {
      color: #fff;
      background-color: grey;
    }
  `}

  ${({ variant }) =>
    variant === 'slack' &&
    `
    background-color: var(--uiBlue);
    color: var(--white);
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1rem 0.75rem 0.5rem;
    :not(:disabled):hover {
      filter: brightness(0.9);
    }
  `}

   ${({ variant }) =>
    variant === 'solid white' &&
    `
    background-color: var(--lightBlueGrey);
    color: var(--blueShade2);
    border: none;
    :not(:disabled):hover {
      filter: brightness(0.9);
    }
  `}

   ${({ variant }) =>
    variant === 'solid red' &&
    `
    background-color: var(--uiError);
    color: var(--white);
    border: none;
    :not(:disabled):hover {
      filter: brightness(0.9);
    }
  `}

   ${({ variant }) =>
    variant === 'outline blue' &&
    `
    color: var(--uiBlue);
    border: 2px solid var(--uiBlue);

    :not(:disabled):hover {
      background-color: var(--uiBlue);
      color: var(--white);
    }
  `}

   ${({ variant }) =>
    variant === 'fw outline blue' &&
    `
    color: var(--uiBlue);
    border: 2px solid var(--uiBlue);
    width: 100%;
    :not(:disabled):hover {
      background-color: var(--uiBlue);
      color: var(--white);
    }
  `}

   ${({ variant }) =>
    variant === 'fw outline white' &&
    `
    background-color: var(--lightBlueGrey);
    color: var(--blueShade2);
    border: 2px solid var(--blueShade2);
    width: 100%;
    :not(:disabled):hover {
      background-color: var(--blueShade2);
      color: var(--lightBlueGrey);
    }
  `}

   ${({ variant }) =>
    variant === 'text-only red' &&
    `
    color: var(--uiError);
    text-decoration-line: underline;
    border: none;
    :not(:disabled):hover {
      filter: brightness(0.8);
    }
  `}

  .button-icon {
    width: 2.25rem;
    height: 2.25rem;
  }

  :disabled {
    filter: contrast(0.8);
  }
`;
