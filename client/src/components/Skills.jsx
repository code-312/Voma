import React from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import StyledFieldset from './StyledFieldset';

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
    <StyledFieldset>
      <Typography variant="h1"> Skills</Typography>
      <Typography variant="p"> Pick your primary skill</Typography>

      <p>
        Select the skill you will practice the most at Code for Chicago. You don&apos;t have to be
        an expert in this skill.
      </p>
      {/* {skillList.map((skill) => (
        <label className="skillLabel" htmlFor={toCamelCase(skill)} key={skill}>
          <input
            type="radio"
            name="skill"
            id={toCamelCase(skill)}
            value={skill}
            checked={skill === skills}
            onChange={handleFormChange}
          />
          {skill}
        </label>
      ))} */}
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
      {/* <nav>
        <button onClick={() => setRegisterStep(1)} type="button">
          Back
        </button>
        <button onClick={() => setRegisterStep(3)} type="button">
          Next
        </button>
      </nav> */}

      <Typography>
        <Button onClick={() => setRegisterStep(1)} type="button">
          Back
        </Button>
        <Button onClick={() => setRegisterStep(3)} type="button">
          Next
        </Button>
      </Typography>
    </StyledFieldset>
  );
}
Skills.propTypes = {
  skills: PropTypes.string.isRequired,
  setRegisterStep: PropTypes.func.isRequired,
  handleFormChange: PropTypes.func.isRequired,
};
