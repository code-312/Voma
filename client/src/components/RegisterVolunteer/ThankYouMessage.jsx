import { Typography, Grid } from '@mui/material';

import styled from 'styled-components';

const StyledThankyou = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;

  div {
    padding: 2rem;
    background-color: var(--lightPeach);
    max-width: 37.875rem;
    border-radius: 6px;
    margin: 0 2rem;

    @media(max-width: 600px) {
      margin: 0 1rem;
    }
  }


`;

export default function ThankYouMessage() {
  return (
  <StyledThankyou>
    <div>
      <h1>Thank You!</h1>
      <p>
        Thanks for taking the time to complete registration. Our onboarding team will reach out to you soon through Slack. In the meantime, please introduce yourself in the #intros channel.
      </p>
    </div>
  </StyledThankyou>);
}
