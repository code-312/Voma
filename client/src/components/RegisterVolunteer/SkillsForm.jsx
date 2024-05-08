/* eslint-disable eqeqeq */
import React, { useState, useContext, useEffect } from 'react';
import { Box, Grid, Button, Radio, RadioGroup, Typography, FormControlLabel } from '@mui/material';
import { ReactComponent as ErrorIcon } from '../../assets/Error.svg';
import { VolunteerContext } from '../../lib/VolunteerProvider';
import { fetchSkills } from '../../lib/Requests';
import { Label3 } from '../../styles/components/Typography';
import StackedInput from '../StackedInputs';


export default function Skills({ volunteer, updateVolunteerArray, updateInfo }) {
  // Todo: include leadershipRole here, with the same set of skills. Also refactor to styled components
  const Volunteer = useContext(VolunteerContext);

  const [skill, setSkill] = useState('');
  const [skillList, setSkillList] = useState([])
  const [unfinished, setUnfinished] = useState(true);

  useEffect(() => {
    async function getSkills() {
      let skills = await fetchSkills();

      setSkillList(skills);
    }
    getSkills()
  }, [])

  const arrayListener = (e) => {
    const { name, value, checked} = e.currentTarget;
    const copy = {...volunteer};
    let arrCopy = [...copy[name]];
    console.log(arrCopy);
    if (checked) {
        arrCopy = [...arrCopy, value];
    } else {
        arrCopy.splice(arrCopy.indexOf(value), 1);

    }
    
    updateVolunteerArray(name, arrCopy);
}


  const updateVolunteer = () => {
    if (skill) {
      Volunteer.updateInfo({ skills: skill });
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
        <div>
          <h1>Skills</h1>
          <p>Select the skill you will practice the most at Code for Chicago. You don&apos;t have to be
          an expert in this skill.</p>
          <Label3>What role(s) do you want to participate as?</Label3>
          {skillList.map((skillOpt) => (
            <StackedInput 
              key={`${skillOpt.name}`}
              labelText={skillOpt.name}
              value={skillOpt.name}
              name="skills"
              checked={volunteer.skills.indexOf(skillOpt.name) != -1}
              onChange={arrayListener}
              type="checkbox"
            /> 
          ))}

          <p>If you are interested in a leadership role on a project, select any of the roles that may apply:</p>
          {skillList.map((skillOpt) => (
            <StackedInput 
              key={`${skillOpt.name}`}
              labelText={skillOpt.name}
              value={skillOpt.name}
              name="leadershipRole"
              checked={volunteer.leadershipRole.indexOf(skillOpt.name) != -1}
              onChange={arrayListener}
              type="checkbox"
            /> 
          ))}
        </div>      
      )
}
