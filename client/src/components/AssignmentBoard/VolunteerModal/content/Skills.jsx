/* eslint-disable eqeqeq */
import React, { useState, useEffect } from 'react';
import { Label3, BodySubText, BodyText2 } from '../../../../styles/components/Typography';
import StackedInput from '../../../StackedInputs';
import RequiredLabel from '../../../RequiredLabel';
import { ProfileInfoContainer } from '../../../../styles/components/VolunteerModal.style';
import { checkBoxListener } from '../../../../lib/util';

export default function Skills({ volunteer, updateVolunteerArray, isEditing, skillList }) {
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
      <h3>Skills</h3>
      <BodySubText>Review the volunteers skills.</BodySubText>
      <RequiredLabel />
      <ProfileInfoContainer>
        <Label3>What role(s) does this volunteer want to participate as?</Label3>
        {isEditing ? (
          skillList.map((skillOpt) => (
            <StackedInput
              key={`${skillOpt.name}`}
              labelText={skillOpt.name}
              value={skillOpt.id}
              name="skills"
              checked={volunteer.skills.some((s) => s.id == skillOpt.id)}
              onChange={skillListener}
              type="checkbox"
            />
          ))
        ) : (
          <BodyText2>{volunteer.skills.map((skill) => skill.name).join(', ')}</BodyText2>
        )}
      </ProfileInfoContainer>

      <ProfileInfoContainer>
        <Label3>
          This volunteer selected indicated interest in a leadership role in the following:
        </Label3>
        {isEditing ? (
          skillList.map((skillOpt) => (
            <StackedInput
              key={`${skillOpt.name}`}
              labelText={skillOpt.name}
              value={skillOpt.name}
              name="leadershipRole"
              checked={volunteer.leadershipRole.indexOf(skillOpt.name) != -1}
              onChange={leaderShipListener}
              type="checkbox"
            />
          ))
        ) : (
          <BodyText2>{volunteer.leadershipRole.join(', ')}</BodyText2>
        )}
      </ProfileInfoContainer>
    </div>
  );
}
