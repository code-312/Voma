/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Label3, Label4, BodyText2 } from '../../styles/components/Typography';
import { StyledInput } from '../../styles/components/Input.style';
import { StyledTextarea } from '../../styles/components/StyledTextarea.style';
import StackedInput from '../StackedInputs';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';
import { ProjectTimeslotContainer, ProjectTimeslotRow } from '../../styles/pages/ProjectPage.style';
import ProjectSelect from './ProjectInfoFormFields/ProjectSelect';
import Button from '../Button';

const ProjectTimeslot = ({ onChange, isEditing, timeslots, addNewTimeslot }) => {
    const [meetingTimes, setMeetingTimes] = useState([]);
    const [meetingDays, setMeetingDays] = useState("");
    const [toBeDeleted, setToBeDeleted] = useState([]);

    useEffect(() => {
        const days = [];
        const times = [];
        const today = new Date();
        if (timeslots) {

            timeslots.forEach((slot) => {
    
                days.push(slot.day);
                
                const startTime = new Date(today.getFullYear(), today.getMonth(), today.getDay(), slot.startHour, slot.startMinute);
                const endTime = new Date(today.getFullYear(), today.getMonth(), today.getDay(), slot.endHour, slot.endMinute);
                times.push(`${slot.day} from ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`);
            });
            
            setMeetingTimes(times.join(', '));
        }

    }, [timeslots]);

    const updateTimeslot = (id, key, value) => {
        const newSlot = {...timeslots.find(slot => slot.id === id)};
        newSlot[key] = value;
        onChange(newSlot);
    }

    const tagToDelete = (id) => {
        setToBeDeleted([...toBeDeleted, id]);
        // trackActivityToDelete(id); todo: finish delete functionality
    }

    const meetingDayOptions = [{
        value: "Monday", text: "Monday" 
    }, {
        value: "Tuesday", text: "Tuesday" 
    }, {
        value: "Wednesday", text: "Wednesday"
    }, {
        value: "Thursday", text: "Thursday"
    }, {
        value: "Friday", text: "Friday"
    }, {
        value: "Saturday", text: "Saturday"
    }, {
        value: "Sunday", text: "Sunday"}];

    const formatTime = (time) => {
        let value = `${time}`;
        if (time < 10) {
            value = `0${time}`;
        }
        return value;
    }
    const hourOptions = [];
    for (let i = 0; i < 24; i++) {
        const formatted = formatTime(i);
        hourOptions.push({ value: i, text: formatted });
    }

    const minuteOptions = [];
    for (let i = 0; i < 60; i++) {
        const formatted = formatTime(i);
        minuteOptions.push({ value: i, text: formatted });
    }

    if (isEditing) {
        return (
            <>
                <ProfileInfoContainer >
                <Label3>Meeting Days and Times</Label3>
                {timeslots.map(slot => (
                    <ProjectTimeslotRow key={`slot-${slot.id}`}>
                        <ProjectTimeslotContainer>
                            <Label4>Day</Label4>
                            <ProjectSelect 
                                options={meetingDayOptions}
                                name="day"
                                currentValue={slot.day}
                                id={slot.id}
                                onChange={updateTimeslot}
                            />
                        </ProjectTimeslotContainer>
                        <ProjectTimeslotContainer>
                            <Label4>Start Time</Label4>
                            <ProjectSelect
                                options={hourOptions}
                                name="startHour"
                                currentValue={slot.startHour}
                                id={slot.id}
                                onChange={updateTimeslot}
                            />
                            <ProjectSelect
                                options={minuteOptions}
                                id={slot.id}
                                currentValue={slot.startMinute}
                                name="startMinute"
                                onChange={updateTimeslot}
                            />
                        </ProjectTimeslotContainer>
                        <ProjectTimeslotContainer>
                        <Label4>End Time</Label4>
                            <ProjectSelect
                                options={hourOptions}
                                id={slot.id}
                                currentValue={slot.endHour}
                                name="endHour"
                                onChange={updateTimeslot}
                            />
                            <ProjectSelect
                                options={minuteOptions}
                                id={slot.id}
                                currentValue={slot.endMinute}
                                name="endMinute"
                                onChange={updateTimeslot}
                            />
                        </ProjectTimeslotContainer>
                        <Button 
                            onClick={() => tagToDelete(slot.id)} 
                            variant="text-only red">
                                Delete
                        </Button>
                    </ProjectTimeslotRow>
                ))}
                <Button 
                    variant="fw outline blue" 
                    icon={PlusCircle} 
                    onClick={addNewTimeslot}>
                        Add Timeslot
                </Button>
                </ProfileInfoContainer>
            </>
        )
    }

    return (
        <div>
            <ProfileInfoContainer>
                <Label3>Meeting Days and Times</Label3>
                <BodyText2>{meetingTimes}</BodyText2>
            </ProfileInfoContainer>
        </div>
    )
};

export default ProjectTimeslot;
