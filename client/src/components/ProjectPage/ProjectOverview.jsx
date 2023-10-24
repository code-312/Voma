import React, { useState, useEffect } from 'react';
import ProjectInfoField from './ProjectInfoField';
import ProjectTimeslot from './ProjectTimeslot';

const ProjectOverview = ({ 
    activelyRecruiting, 
    cadence, 
    isEditing, 
    timeslots, 
    timeslotListener,
    addNewTimeslot,
    tagTimeslotToDelete,
    description, 
    saveFn, 
    changeListener 
}) => {
    const overviewEditOptions = [{
        value: "true", text: 'Actively Recruiting'}, {
        value: "false", text: 'Not Actively Recruiting'}];

    const cadenceOptions = [{
        value: "daily", text: "Daily"
    }, {
        value: "weekly", text: "Weekly"
    }, {
        value: "biweekly", text: "Biweekly"
    }, {
        value: "monthly", text: "Monthly"
    }];

    return (
        <>
            <ProjectInfoField
                label="Recruitment Status"
                value={activelyRecruiting}
                valueText={activelyRecruiting === 'true' ? 'Actively Recruiting' : 'Not Actively Recruiting'}
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
           <ProjectTimeslot
                onChange={timeslotListener}
                timeslots={timeslots}
                isEditing={isEditing}
                addNewTimeslot={addNewTimeslot}
                tagTimeslotToDelete={tagTimeslotToDelete}
           />
            <ProjectInfoField
                label="Summary"
                value={description}
                isEditing={isEditing}
                name="summary"
                type="textbox"
            />
        </>
    );
}

export default ProjectOverview;