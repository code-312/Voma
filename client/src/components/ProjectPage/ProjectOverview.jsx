import React, { useState, useEffect } from 'react';
import ProjectInfoField from './ProjectInfoField';

const ProjectOverview = ({ project, isEditing, saveFn }) => {
    const [meetingDays, setMeetingDays] = useState("");
    const [meetingTimes, setMeetingTimes] = useState("");

    useEffect(() => {
        const days = [];
        const times = [];
        const today = new Date();
        if (project.Timeslots) {

            project.Timeslots.forEach((slot) => {
                days.push(slot.day);
                
                const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDay(), slot.startHour, slot.startMinute);
                const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDay(), slot.endHour, slot.endMinute);
                times.push(`${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`);
            });
            
            setMeetingDays(days.join(', '));
            setMeetingTimes(times.join(', '));
        }

    }, [project.Timeslots]);

    return (
        <>
            <ProjectInfoField
                label="Recruitment Status"
                value={project.activelyRecruiting ? 'Actively Recruiting' : 'Not Actively Recruiting'}
                isEditing={isEditing}
            />
            <ProjectInfoField
                label="Meeting Frequency"
                value={project.meetingCadence}
                isEditing={isEditing}
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
                value={project.description}
                isEditing={isEditing}
            />
        </>
    );
}

export default ProjectOverview;