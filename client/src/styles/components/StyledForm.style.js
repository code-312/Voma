import styled from "styled-components";

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 28rem;
    padding: 2rem;
    margin: 4rem auto;
    background: var(--lightPeach);
    border-radius: 6px;

    h2 {
        font-size: 2.625rem;
        font-weight: 700;
        span {
          font-size: 1.25rem;
          font-weight: 400;
          display: block;
          color: var(--blueShadeIII);
          margin-top: 0.75rem;
        }
    }

    button {
        align-self: flex-start;
    }
`;

export default StyledForm;
