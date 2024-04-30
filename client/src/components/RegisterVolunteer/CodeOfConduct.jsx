import { useState, useContext } from 'react';
import { Box, FormControlLabel, RadioGroup, Typography, Radio, Link } from '@mui/material';
import styled from 'styled-components';
import { ReactComponent as ErrorIcon } from '../../assets/Error.svg';
import { ButtonStyle } from '../../styles/components/Button.style';
import { VolunteerContext } from '../../lib/VolunteerProvider';

export default function CodeOfConduct() {
  const [accepted, setAccepted] = useState(false);

  const Volunteer = useContext(VolunteerContext);

  const completeRegistration = () => {
    if (accepted) {
      Volunteer.registerVolunteer();
    }
  };

  const StyledConductPage = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 90%;
    max-width: 40rem;
    margin: 4rem auto;
    background: var(--lightPeach);
    border-radius: 0.375rem;
    padding: 1.4rem;

    @media (min-width: 600px) {
      width: 80%;
      padding: 2rem;
    }

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
  `;

  const StyledRadioLabel = styled.div`
    width: 100%;
    height: 3.75rem;
    display: flex;
    align-items: center;
    border-radius: 0.1875rem;
    background: #f8f8f8;
    border: 0.0625rem solid #e0e0e0;
    padding: 0.9375rem;
  `;

  return (
    <StyledConductPage sx={{ margin: 'auto' }}>
      <h2>
        Code of Conduct
        <span>Please review the code of conduct below.</span>
      </h2>
      <Box>
        <ErrorIcon variant="filled" sx={{ display: 'inline-block', height: '7.5rem' }} />
        <Typography
          component="div"
          color="#a31864"
          sx={{ display: 'inline-block', marginLeft: '0.625rem', verticalAlign: 'top' }}
        >
          *Required
        </Typography>
      </Box>

      <Box>
        <h3 mb={1}>
          Code of Conduct
          <span style={{ color: '#a31864', display: 'inline', marginLeft: '0.212rem' }}>*</span>
        </h3>

        <Box
          className="conduct-code"
          sx={{
            backgroundColor: 'white',
            padding: '1.5rem',
            maxHeight: '37.5rem',
            overflowX: 'hidden',
            outline: '1px solid #e0e0e0',
            overflowY: 'scroll',
          }}
        >
          <Typography paragraph mb={3}>
            Adapted from the{' '}
            <Link sx={{ fontSize: '1rem' }} href="https://github.com/codeforamerica/codeofconduct">
              CfA Code of Conduct
            </Link>
            .
          </Typography>
          <Typography paragraph>
            We are an official brigade. The Code for Chicago community expects that Code for Chicago
            events, and digital forums:
          </Typography>

          <Typography>Are a safe and respectful environment for all participants.</Typography>
          <Typography>
            Are a place where people are free to fully express their identities.
          </Typography>
          <Typography>
            Presume the value of others. Everyone&apos;s ideas, skills, and contributions have
            value.
          </Typography>
          <Typography>
            Don&apos;t assume everyone has the same context, and encourage questions.
          </Typography>
          <Typography>
            Find a way for people to be productive with their skills (technical and not) and energy.
            Use language such as “yes/and”, not “no/but.”
          </Typography>
          <Typography>
            Encourage members and participants to listen as much as they speak.
          </Typography>
          <Typography>
            Strive to build tools that are open and free technology for public use. Activities that
            aim to foster public use, not private gain, are prioritized.
          </Typography>
          <Typography>
            Prioritize access for and input from those who are traditionally excluded from the civic
            process.
          </Typography>
          <Typography>
            Work to ensure that the community is well-represented in the planning, design, and
            implementation of civic tech. This includes encouraging participation from women,
            minorities, and traditionally marginalized groups.{' '}
          </Typography>
          <Typography>
            Actively involve community groups and those with subject matter expertise in the
            decision-making process.
          </Typography>
          <Typography>
            Ensure that the relationships and conversations between community members, the local
            government staff and community partners remain respectful, participatory, and
            productive.
          </Typography>
          <Typography>
            Provide an environment where people are free from discrimination or harassment.
          </Typography>

          <Typography mt={2}>
            Code for Chicago reserves the right to ask anyone in violation of these policies not to
            participate in Code for Chicago network activities, events, and digital forums.
          </Typography>
        </Box>
      </Box>

      <Box>
        <h3 style={{ margin: '0.3125rem auto 0.9375rem' }}>
          Do you agree to our Code of Conduct?
          <span
            style={{
              color: '#a31864',
              display: 'inline',
              marginLeft: '0.3125rem',
              marginTop: '-0.1875rem',
            }}
          >
            *
          </span>
        </h3>

        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          sx={{ marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}
          className="AcceptCOC" // Hook for unit tests
          name="radio-buttons-group"
        >
          <StyledRadioLabel>
            <FormControlLabel
              type="radio"
              onChange={() => setAccepted(true)}
              checked={accepted}
              value="I understand and I accept this Code of Conduct"
              label="Yes, I agree to the Code of Conduct"
              control={<Radio />}
            />
          </StyledRadioLabel>
          <StyledRadioLabel>
            <FormControlLabel
              type="radio"
              checked={!accepted}
              onChange={() => setAccepted(false)}
              value="I do not accept this Code of Conduct"
              label="No, I don't agree to the Code of Conduct"
              control={<Radio />}
            />
          </StyledRadioLabel>
        </RadioGroup>

        <Box sx={{ display: 'flex', gap: '1.25rem' }}>
          <ButtonStyle
            onClick={() => Volunteer.setRegistrationStep(3)}
            size="medium"
            variant="outline blue"
            className=""
          >
            <Typography paragraph sx={{ maxWidth: '4.5rem', width: '33vw' }}>
              Back
            </Typography>
          </ButtonStyle>
          <ButtonStyle
            disabled={!accepted}
            size="large"
            onClick={completeRegistration}
            variant="solid blue"
            className={styled.primaryButton}
          >
            <Typography paragraph sx={{ maxWidth: '12.5rem', width: '33vw' }}>
              Next
            </Typography>
          </ButtonStyle>
        </Box>
      </Box>
    </StyledConductPage>
  );
}
