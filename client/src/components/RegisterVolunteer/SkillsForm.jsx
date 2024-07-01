/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { fetchSkills } from '../../lib/Requests';
import { Label3 } from '../../styles/components/Typography';
import StackedInput from '../StackedInputs';
import RequiredLabel from '../RequiredLabel';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';
import { allArraysPopulated, checkBoxListener } from '../../lib/util';

export default function Skills({ volunteer, updateVolunteerArray, setCanProceed }) {
  const [skillList, setSkillList] = useState([]);

  useEffect(() => {
    async function getSkills() {
      let skills = await fetchSkills();

      setSkillList(skills);
    }
    getSkills();
  }, []);

  useEffect(() => {
    setCanProceed(allArraysPopulated([volunteer.skills, volunteer.leadershipRole]));
  }, [volunteer.skills, volunteer.leadershipRole, setCanProceed]);

  const skillListener = (e) => {
    const { value, checked } = e.currentTarget;
    const copy = { ...volunteer };
    let arrCopy = copy.skills;
    let newSkill = skillList.find((s) => s.id == value);

    if (checked) {
      arrCopy = [...arrCopy, newSkill];
    } else {
      const index = arrCopy.findIndex((s) => s.id == value);
      arrCopy.splice(arrCopy.indexOf(index), 1);
    }

    updateVolunteerArray('skills', arrCopy);
  };

  const leaderShipListener = (e) => {
    checkBoxListener(e, volunteer, updateVolunteerArray);
  };

  return (
    <div>
      <h1>Skills</h1>
      <p>
        Select the skill you will practice the most at Code for Chicago. You don&apos;t have to be
        an expert in this skill.
      </p>
      <RequiredLabel />
      <ProfileInfoContainer>
        <Label3>What role(s) do you want to participate as?</Label3>
        {skillList.map((skillOpt) => (
          <StackedInput
            key={`${skillOpt.name}`}
            labelText={skillOpt.name}
            value={skillOpt.id}
            name="skills"
            checked={volunteer.skills.some((s) => s.id == skillOpt.id)}
            onChange={skillListener}
            type="checkbox"
          />
        ))}
      </ProfileInfoContainer>

      <ProfileInfoContainer>
        <Label3>
          If you are interested in a leadership role on a project, select any of the roles that may
          apply:
        </Label3>
        {skillList.map((skillOpt) => (
          <StackedInput
            key={`${skillOpt.name}`}
            labelText={skillOpt.name}
            value={skillOpt.name}
            name="leadershipRole"
            checked={volunteer.leadershipRole.indexOf(skillOpt.name) != -1}
            onChange={leaderShipListener}
            type="checkbox"
          />
        ))}
        <StackedInput
          labelText="N/A"
          value="N/A"
          name="leadershipRole"
          checked={volunteer.leadershipRole?.indexOf('N/A') != -1}
          onChange={leaderShipListener}
          type="checkbox"
        />
      </ProfileInfoContainer>
    </div>
  );
}
