import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';
import MUIFieldsetStyles from './MUIStyledFieldSet';

export default function BasicInfo({
  emailAddress,
  fullName,
  pronouns,
  setRegisterStep,
  handleFormChange,
}) {
  const filledOut = emailAddress !== '' && fullName !== '' && pronouns !== '' && true;
  return (
    <MUIFieldsetStyles>
      <Typography variant="h4" component="h1">Basic Info</Typography>
      <Typography paragraph="true">Input basic info about yourself</Typography>
{/* background:; */}

      <Typography variant="div" color=" #B00020">
        <ErrorIcon variant="filled" />
        All fields are required{' '}
      </Typography>
      <TextField
        id="emailAddress"
        type="text"
        name="emailAddress"
        label="Email Address?"
        InputLabelProps={{ shrink: true, color: 'secondary' }}
        onChange={handleFormChange}
        value={emailAddress}
      />
      <TextField
        id="fullName"
        type="text"
        name="fullName"
        label="Full Name?"
        InputLabelProps={{ shrink: true, color: 'secondary' }}
        onChange={handleFormChange}
        value={fullName}
        required
        fullWidth
      />
      <TextField
        id="pronouns"
        type="text"
        name="pronouns"
        onChange={handleFormChange}
        value={pronouns}
        label="Pronouns"
        InputLabelProps={{ shrink: true, color: 'secondary' }}
        InputProps={{ color: 'secondary' }}
      />
      <Button
        size="small"
        variant="contained"
        onClick={filledOut ? () => setRegisterStep(3) : null}
        disabled={!filledOut}
        type="button"
      >
        Next
      </Button>
    </MUIFieldsetStyles>
  );
}
BasicInfo.propTypes = {
  emailAddress: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
  pronouns: PropTypes.string.isRequired,
  setRegisterStep: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
};
