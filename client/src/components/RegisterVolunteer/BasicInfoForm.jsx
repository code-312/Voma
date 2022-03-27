import React, { useState, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';

import MUIFieldsetStyles from '../MUIStyledFieldSet';
import { VolunteerContext } from '../../lib/VolunteerProvider';

export default function BasicInfoForm() {
  const Volunteer = useContext(VolunteerContext);
  const [unfinished, setUnfinished] = useState(false);

  const [basicInfo, setBasicInfo] = useState({
    email: Volunteer.email || '',
    name: Volunteer.name || '',
    pronouns: '',
  });

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
    Volunteer.setRegistrationStep(3);
  };

  return (<>
    <MUIFieldsetStyles>
      <Typography variant="h4" component="h1">Basic Info</Typography>
      <Typography>Input basic info about yourself</Typography>

      {unfinished && 
        <Typography variant="div" color=" #B00020">
          <ErrorIcon variant="filled" />
          All fields are required{' '}
        </Typography>
      }
      <TextField
        id="emailAddress"
        type="text"
        name="email"
        label="Email Address"
        InputLabelProps={{ shrink: true, color: 'secondary' }}
        onChange={updateInfo}
        defaultValue={Volunteer?.email}
      />
      <TextField
        id="fullName"
        type="text"
        name="name"
        label="Full Name"
        InputLabelProps={{ shrink: true, color: 'secondary' }}
        onChange={updateInfo}
        defaultValue={Volunteer?.name}
        fullWidth
      />
      <TextField
        id="pronouns"
        type="text"
        name="pronouns"
        onChange={updateInfo}
        label="Pronouns"
        InputLabelProps={{ shrink: true, color: 'secondary' }}
        InputProps={{ color: 'secondary' }}
      />
      <Button
        size="small"
        variant="contained"
        style={{backgroundColor: '#6200EE' }}
        onClick={completed() ? () => updateVolunteer() : () => setUnfinished(true)}
        type="button"
      >
        Next
      </Button>
    </MUIFieldsetStyles>
  </>);
}
