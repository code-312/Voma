import styled from "styled-components";

export const RegisterPageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100%;
    background-color: var(--peachShade1);

    .registration-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: start;
        width: 100%;
        max-width: 37.875rem;
        padding: 2.5rem;
        background-color: var(--lightPeach);
        border-radius: 0.5rem;

        p {
          color: var(--blueShadeIII);
          margin-bottom: 2rem;
        }

        button {
          display: flex;
          align-items: center;
        }
    }
`;
