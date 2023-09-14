import React, { useState, useEffect } from 'react';
import ProjectInfoField from './ProjectInfoField';

const ProjectOverview = ({ activelyRecruiting, cadence, isEditing, timeslots, description, saveFn, changeListener }) => {
    const [meetingDays, setMeetingDays] = useState("");
    const [meetingTimes, setMeetingTimes] = useState("");

    useEffect(() => {
        const days = [];
        const times = [];
        const today = new Date();
        if (timeslots) {

            timeslots.forEach((slot) => {
                days.push(slot.day);
                
                const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDay(), slot.startHour, slot.startMinute);
                const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDay(), slot.endHour, slot.endMinute);
                times.push(`${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`);
            });
            
            setMeetingDays(days.join(', '));
            setMeetingTimes(times.join(', '));
        }

    }, [timeslots]);

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
            <ProjectInfoField
                label="Meeting Day"
                value={meetingDays}
                isEditing={isEditing}
            />
            <ProjectInfoField
                label="Meeting Time"
                value={meetingTimes}
                isEditing={isEditing}
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