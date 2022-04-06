import React, { useState, useContext } from 'react';
import { Box, Grid, TextField, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ReactComponent as ErrorIcon } from '../../assets/Error.svg';

import { VolunteerContext } from '../../lib/VolunteerProvider';

const useStyles = makeStyles({
  ContentArea: {
    '& .MuiOutlinedInput-input': {
      width: '328px',
    },
    '& .MuiOutlinedInput-root': {
      marginBottom: '32px',
    }
  }

});

export default function BasicInfoForm() {
  const Volunteer = useContext(VolunteerContext);
  const [basicInfo, setBasicInfo] = useState({
    email: Volunteer.email || '',
    name: Volunteer.name || '',
    pronouns: '',
  });

  const classes = useStyles();
  const completed = () => {
    const fields = Object.keys(basicInfo);
    for (let i=0; i<fields.length; i+=1) {
      const key = fields[i];
      if (!basicInfo[key]) {
        return false;
      }
    }
    return true;
  }

  const updateInfo = (e) => {
    setBasicInfo({
      ...basicInfo,
      [e.target.name]: e.target.value,
    })
  }

  const updateVolunteer = () => {
    Volunteer.updateInfo(basicInfo);
    Volunteer.setRegistrationStep(2);
  };

  return (<>
    <Grid container justifyContent="flex-end" className={classes.ContentArea}>
      <Grid item sm={9} xs={11}>
        <Typography variant="h4" component="h1" mb="16px">Basic Info</Typography>
        <Typography mb="16px">Input basic info about yourself</Typography>
        <Box mb="32px">
          <ErrorIcon variant="filled" sx={{ display: 'inline-block' }} /> 
          <Typography component="div" color="#B00020" sx={{ display: 'inline-block', marginLeft: '10px', verticalAlign: 'top'}}>All fields are required</Typography>
        </Box>
      </Grid>
      <Grid item sm={9} xs={11}>
        <TextField
          id="emailAddress"
          type="text"
          name="email"
          label="Email Address"
          placeholder="email@domain.com"
          InputLabelProps={{ shrink: true, color: 'secondary' }}
          onChange={updateInfo}
          defaultValue={Volunteer?.email}
        />
      </Grid>

      <Grid item sm={9} xs={11}>
        <TextField
          id="fullName"
          type="text"
          name="name"
          label="Full Name"
          placeholder="How would you want to be addressed?"
          InputLabelProps={{ shrink: true, color: 'secondary' }}
          onChange={updateInfo}
          defaultValue={Volunteer?.name}
        />
      </Grid>

      <Grid item sm={9} xs={11}>
        <TextField
          id="pronouns"
          type="text"
          name="pronouns"
          onChange={updateInfo}
          label="Pronouns"
          placeholder="How would you want to be addressed?"
          InputLabelProps={{ shrink: true, color: 'secondary' }}
          InputProps={{ color: 'secondary' }}
        />
      </Grid>

      <Grid item sm={9} xs={11}>
        <Button
          size="medium"
          variant="contained"
          onClick={completed() ? () => updateVolunteer() : null}
          type="button"
          disabled={!basicInfo.pronouns || !basicInfo.name || !basicInfo.email}
        >
          Next
        </Button>
      </Grid>

    </Grid>
  </>);
}
