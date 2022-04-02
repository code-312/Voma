import React, { useState, useEffect, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { Box, TextField, Dialog, DialogActions, DialogContent, DialogContentText, Alert, Grid, Button, Typography, SvgIcon } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactComponent as SlackIcon } from '../assets/WhiteSlackIcon.svg';

import { VolunteerContext } from '../lib/VolunteerProvider'

const useStyles = makeStyles({
  SlackButton: {
    padding: 0,
    paddingRight: '8px',
    marginRight: '20px',
    '& .MuiButton-startIcon': {
      marginRight: 0,
    },
    '& svg': {
      width: 36,
      height: 36,
      marginRight: 0,
    }
  },
  Alert: {
    '& .MuiPaper-root': {
      justifyContent: 'center',
      marginTop: '-32px',
      marginBottom: '32px',
    }
  }
});

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const classes = useStyles();

  const Volunteer = useContext(VolunteerContext);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const onInputChange = (e) => {
    setEmail(e.target.value);
  }

  const goToSlackLink = () => {
    window.location = 'https://join.slack.com/t/apitest-jwd7276/shared_invite/zt-11cgm52ly-60DmFwe6BaXUN1wJnRa79g';
  }

  const buttonText = loading ? 'Searching...' : 'Submit';

  useEffect(() => {
    if (Volunteer.notRegistered) {
      setLoading(false);
    }
  }, [Volunteer.notRegistered]);

  return (<>
    {Volunteer.isAuthenticated && <Redirect to="/register" />}
    {Volunteer.notRegistered &&          
      <Box className={classes.Alert}>
        <Alert severity="warning" justifyContent="center">
            Looks like you haven&apos;t joined our workspace. 
            Please <a href="https://join.slack.com/t/apitest-jwd7276/shared_invite/zt-11cgm52ly-60DmFwe6BaXUN1wJnRa79g">join our workspace</a> before registering.
        </Alert>
      </Box>
    }
    <Dialog open={modalOpen}>
      <DialogContent>
        <DialogContentText>
          Let&apos;s see if you&apos;re in our workspace: 
        </DialogContentText>
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
          <Button onClick={() => {
            Volunteer.slackExists(email);
            closeModal();
          }}>{buttonText}</Button>
        </DialogActions>
    </Dialog>

    <Grid container justifyContent="center">
      <Grid item sm={6} xs={12}>
        <Typography variant="subtitle">Code for Chicago</Typography>

        <Typography gutterBottom variant="h4" component="h1">Volunteer Registration</Typography>

        <Typography gutterBottom vairant="body" paragraph>
        As part of the Code for America brigade network, Code for Chicago connects skills-based volunteers 
        to Chicago-based nonprofits, mutual aid groups, and people with ideas on how they can improve their community.
        </Typography>

        <Typography gutterBottom vairant="body" paragraph sx={{ marginBottom: '32px' }}>
        All incoming volunteers are required to register to our Slack workspace. If you haven&apos;t joined our 
        Slack workshpace yet then register first. Afterwards, come back here to complete the volunteer registration process.
        </Typography>

        <Button 
          className={classes.SlackButton}
          size="small" 
          startIcon={<SvgIcon><SlackIcon /></SvgIcon>} 
          variant="contained" 
          onClick={openModal}
        >
          Sign in With Slack
        </Button>      
        
        <Button 
          onClick={goToSlackLink} 
          href="https://join.slack.com/t/apitest-jwd7276/shared_invite/zt-11cgm52ly-60DmFwe6BaXUN1wJnRa79g" 
          size="small" 
          variant="text"
        >
          Not registered to our slack?
        </Button>
      </Grid>
    </Grid>
  </>)
}

