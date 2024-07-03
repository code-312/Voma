import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';
import ApiError from '../components/ApiError';
import { ReactComponent as SlackIcon } from '../assets/WhiteSlackIcon.svg';
import { RegisterPageContainer } from '../styles/pages/RegisterPage.style';
import { VolunteerContext } from '../lib/VolunteerProvider';
import Button from '../components/Button';

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const Volunteer = useContext(VolunteerContext);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const onInputChange = (e) => {
    setEmail(e.target.value);
  };

  const SLACK_LINK =
    'https://join.slack.com/t/code312/shared_invite/zt-2acnn36rl-kNFFP9E_NqxWORqHfBIO2w';

  return (
    <>
      {Volunteer.isAuthenticated && <Redirect to="/register" />}
      {Volunteer.notRegistered && (
        <ApiError
          message={`Looks like you haven't joined our workspace. Please <a href='${SLACK_LINK}'>join our workspace</a> before registering.`}
        />
      )}
      <Dialog open={modalOpen}>
        <DialogContent>
          <DialogContentText>Let&apos;s see if you&apos;re in our workspace:</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={onInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal}>Cancel</Button>
          <Button
            onClick={() => {
              Volunteer.slackExists(email);
              closeModal();
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <RegisterPageContainer>
        <div className="registration-form">
          <h1>Volunteer Registration</h1>

          <p>
            Code312 connects skills-based volunteers to Chicago-based nonprofits, mutual aid groups,
            and people with ideas on how they can improve their community.
          </p>

          <p>
            All incoming volunteers are required to register to our Slack workspace. If you
            haven&apos;t joined our Slack workspace yet then register first. Afterwards, come back
            here to complete the volunteer registration process.
          </p>

          <Button onClick={openModal} variant="slack" icon={SlackIcon}>
            Sign in With Slack
          </Button>
          {/* Kept in case we want to implement in the future */}
          {/* <Button
            onClick={goToSlackLink}
            href="https://join.slack.com/t/apitest-jwd7276/shared_invite/zt-11cgm52ly-60DmFwe6BaXUN1wJnRa79g"
            size="small"
            variant="text"
          >
            Not registered to our slack?
          </Button> */}
        </div>
      </RegisterPageContainer>
    </>
  );
}
