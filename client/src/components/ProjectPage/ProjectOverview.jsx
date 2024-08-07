import React from 'react';
import ProjectInfoField from './ProjectInfoField';
import Timeslot from './Timeslot';

const ProjectOverview = ({
  activelyRecruiting,
  cadence,
  isEditing,
  timeslots,
  timeslotListener,
  addNewTimeslot,
  deleteTimeslot,
  summary,
  projectName,
  changeListener,
}) => {
  const overviewEditOptions = [
    {
      value: 'true',
      text: 'Actively Recruiting',
    },
    {
      value: 'false',
      text: 'Not Actively Recruiting',
    },
  ];

  const cadenceOptions = [
    {
      value: 'daily',
      text: 'Daily',
    },
    {
      value: 'weekly',
      text: 'Weekly',
    },
    {
      value: 'biweekly',
      text: 'Biweekly',
    },
    {
      value: 'monthly',
      text: 'Monthly',
    },
  ];

  return (
    <>
      <ProjectInfoField
        label="Project Name"
        value={projectName}
        isEditing={isEditing}
        name="projectName"
        changeListener={changeListener}
        type="textbox"
        displayEditOnly
      />
      <ProjectInfoField
        label="Recruitment Status"
        value={activelyRecruiting}
        valueText={
          activelyRecruiting === 'true' ? 'Actively Recruiting' : 'Not Actively Recruiting'
        }
        isEditing={isEditing}
        name="activelyRecruiting"
        changeListener={changeListener}
        options={overviewEditOptions}
        type="radio"
      />
      <ProjectInfoField
        label="Meeting Frequency"
        value={cadence}
        isEditing={isEditing}
        name="meetingCadence"
        type="radio"
        changeListener={changeListener}
        options={cadenceOptions}
      />
      <Timeslot
        onChange={timeslotListener}
        timeslots={timeslots}
        isEditing={isEditing}
        deleteTimeslot={deleteTimeslot}
        addNewTimeslot={addNewTimeslot}
      />
      <ProjectInfoField
        label="Summary"
        value={summary}
        isEditing={isEditing}
        changeListener={changeListener}
        name="summary"
        type="textbox"
      />
    </>
  );
};

export default ProjectOverview;
