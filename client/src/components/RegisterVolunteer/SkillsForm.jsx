import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { FormControlLabel } from '@mui/material';
import Button from '@mui/material/Button';
import RadioGroup from '@mui/material/RadioGroup';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import MUIFieldsetStyles from '../MUIStyledFieldSet';

import { VolunteerContext } from '../../lib/VolunteerProvider';

export default function Skills() {
  const Volunteer = useContext(VolunteerContext);
  const [skill, setSkill] = useState('');
  const [unfinished, setUnfinished] = useState(false);

  const skillList = [
    'Content Strategy',
    'Data Analytics',
    'Front-End or Back-End Development',
    'Project Management',
    'Product Management',
    'UX/UI Design/Research / Visual Design',
  ];

  const handleSkillChoice = (e) => { setSkill(e.target.value); };

  const updateVolunteer = () => {
    if (skill) {
      Volunteer.updateInfo({ skill });
      Volunteer.setRegistrationStep(3);
    } else {
      setUnfinished(true);
    }
  }

  const toCamelCase = (str) =>
    str
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) =>
        index === 0 ? word.toLowerCase() : word.toUpperCase(),
      )
      .replace(/\s+/g, '');

  return (
    <MUIFieldsetStyles>
      <Typography variant="h4" component="h1">&nbsp;Skills</Typography>
      <Typography>
        &nbsp;
        Select the skill you will practice the most at Code for Chicago. You don&apos;t have to be
        an expert in this skill.
      </Typography>

      {unfinished &&
        <Typography variant="div" color=" #B00020">
          <ErrorIcon variant="filled" />
          All fields are required
        </Typography>
      }
      <Typography variant="h5" style={{padding: '1rem'}}>Choose only one</Typography>


      <RadioGroup
        defaultValue="female"
        name="radio-buttons-group"
      >
        {skillList.map((skillOption) => (
          <FormControlLabel
            key={skillOption}
            type="radio"
            name="skill"
            id={toCamelCase(skillOption)}
            value={skillOption}
            onChange={(e) => handleSkillChoice(e)}
            checked={skillOption === skill}
            label={skillOption}
            control={<Radio />}
          />
        ))}
      </RadioGroup>

      <Typography variant="button">
        <Button onClick={() => Volunteer.setRegistrationStep(2)} style={{backgroundColor: '#6200EE' }} variant="contained">
          Back
        </Button>
        <Button onClick={() => updateVolunteer()} style={{backgroundColor: '#6200EE' }} variant="contained">
          Next
        </Button>
      </Typography>
    </MUIFieldsetStyles>
  );
}
