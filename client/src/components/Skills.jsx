import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import MUIFieldsetStyles from './MUIStyledFieldSet';

export default function Skills({ skills, handleFormChange, setRegisterStep }) {
  const skillList = [
    'Data Analytics',
    'Data Science',
    'Machine Learning',
    'Front-End',
    'Back-End',
    'Content Strategy',
    'UX Research',
    'UX Design',
    'UI Design',
    'Visual Design',
    'Product Management',
    'Project Management',
  ];

  const toCamelCase = (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase(),
      )
      .replace(/\s+/g, '');

  return (
    <MUIFieldsetStyles>
      <Typography variant="h1"> Skills</Typography>
      <Typography paragraph="true">
        {' '}
        Select the skill you will practice the most at Code for Chicago. You don&apos;t have to be
        an expert in this skill.
      </Typography>

      <Typography variant="div" color="red">
        <ErrorIcon variant="filled" />
        All fields are required
      </Typography>

      <Typography paragraph="true">Choose only one</Typography>

      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        {skillList.map((skill) => (
          <FormControlLabel
            key={skill}
            type="radio"
            name="skill"
            id={toCamelCase(skill)}
            value={skill}
            checked={skill === skills}
            onChange={handleFormChange}
            label={skill}
            control={<Radio />}
          />
        ))}
      </RadioGroup>

      <Typography variant="button">
        <Button onClick={() => setRegisterStep(2)} variant="contained">
          Back
        </Button>
        <Button onClick={() => setRegisterStep(4)} variant="contained">
          Next
        </Button>
      </Typography>
    </MUIFieldsetStyles>
  );
}
Skills.propTypes = {
  skills: PropTypes.string.isRequired,
  setRegisterStep: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
};
