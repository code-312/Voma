import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';
import MUIFieldsetStyles from './MUIStyledFieldSet';

export default function BasicInfo({
  firstName,
  lastName,
  pronouns,
  setRegisterStep,
  handleFormChange,
}) {
  const filledOut = firstName !== '' && lastName !== '' && pronouns !== '' && true;
  return (
    <MUIFieldsetStyles>
      <Typography variant="h1">Basic Info</Typography>
      <Typography paragraph="true">Input basic info about yourself</Typography>

      <Typography variant="div" color="red">
        <ErrorIcon variant="filled" />
        All fields are required{' '}
      </Typography>
      <TextField
        id="firstName"
        type="text"
        name="firstName"
        label="First Name?"
        InputLabelProps={{ shrink: true, color: 'secondary' }}
        onChange={handleFormChange}
        value={firstName}
      />
      <TextField
        id="lastName"
        type="text"
        name="lastName"
        label="Last Name?"
        InputLabelProps={{ shrink: true, color: 'secondary' }}
        onChange={handleFormChange}
        value={lastName}
        required
        fullWidth
      />
      <TextField
        id="pronouns"
        type="text"
        name="pronouns"
        onChange={handleFormChange}
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
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  pronouns: PropTypes.string.isRequired,
  setRegisterStep: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
};
