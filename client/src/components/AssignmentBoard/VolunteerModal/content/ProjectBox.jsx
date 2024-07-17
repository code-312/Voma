import React, { useEffect, useState } from 'react';
import Accordion from '../../../Accordion';
import { Label1, Label3, BodySubLabel } from '../../../../styles/components/Typography';
import { VolunteerLabel } from '../../../../styles/components/VolunteerCard.style';
import {
  AssignAccordionHeader,
  ProjectSkillContainer,
  ProjectAssignButtonContainer,
  IncompleteTaskIcon,
} from '../../../../styles/components/VolunteerModal.style';
import Button from '../../../Button';
import { getPlainTextMeetingTimes } from '../../../../lib/util';
import { ReactComponent as CompletedTask } from '../../../../assets/CompletedTask.svg';

const ProjectBox = ({ project, matchScore, assigned, toggleAssign }) => {
  const [bgColor, setBgColor] = useState('peachShade1');
  const [color, setColor] = useState('white');
  const [matchLanguage, setMatchLanguage] = useState("Does Not Meet Requirements");
  const [meetingTimes, setMeetingTimes] = useState("");

  useEffect(() => {
    if (matchScore) {
      if (matchScore.total === 2) {
        setBgColor('volunteerGreen');
        setMatchLanguage('Meets 2 Out of 2 Requirements');
      } else if (matchScore.total === 1) {
        setBgColor('managementBlue');
        setMatchLanguage('Meets 1 Out of 2 Requirements');
      } else {
        setColor('blueShadeII');
      }
    }
  }, [matchScore]);

  useEffect(() => {
    if (project.Timeslots) {
      const times = getPlainTextMeetingTimes(project.Timeslots);
      setMeetingTimes(times.join(', '));
    }
  }, [project.Timeslots])

  const setProjectAndToggleAssign = () => {
    toggleAssign(project);
  };




  const header = (
    <AssignAccordionHeader>
      <Label1>{project.name}</Label1>
      <VolunteerLabel
        bgColor={bgColor}
        color={color}
      >
        {matchLanguage}
      </VolunteerLabel>
      {assigned && (
        <VolunteerLabel bgColor="uiBlue" color="white">
          Assigned
        </VolunteerLabel>
      )}
    </AssignAccordionHeader>
  );

  return (
    // todo: get display working properly
    <Accordion header={header}>
      <ProjectSkillContainer>
        {matchScore?.skill === 1 ? <CompletedTask /> : <IncompleteTaskIcon />}
        <div>
          <Label3>Role</Label3>
          <BodySubLabel>{project.currentNeeds.join(', ')}</BodySubLabel>
        </div>
      </ProjectSkillContainer>
      <ProjectSkillContainer>
        {matchScore?.available === 1 ? <CompletedTask /> : <IncompleteTaskIcon />}
        <div>
          <Label3>Availability</Label3>
          <BodySubLabel>{meetingTimes}</BodySubLabel>
        </div>
      </ProjectSkillContainer>
      <ProjectAssignButtonContainer>
        {assigned ? (
          <Label3>Currently Assgined to This Project</Label3>
        ) : (
          <Button variant="fw outline blue" onClick={setProjectAndToggleAssign}>
            Assign volunteer to this project
          </Button>
        )}
      </ProjectAssignButtonContainer>
    </Accordion>
  );
};

export default ProjectBox;
