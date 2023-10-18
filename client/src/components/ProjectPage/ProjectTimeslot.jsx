/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { Label3, BodyText2 } from '../../styles/components/Typography';
import { StyledInput } from '../../styles/components/Input.style';
import { StyledTextarea } from '../../styles/components/StyledTextarea.style';
import StackedInput from '../StackedInputs';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';

const ProjectTimeslot = ({ onChange, isEditing, timeslots }) => {
    const [meetingTimes, setMeetingTimes] = useState([]);
    const [meetingDays, setMeetingDays] = useState("");

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

    const meetingDayOptions = [{
        value: "monday", text: "Monday" 
    }, {
        value: "tuesday", text: "Tuesday" 
    }, {
        value: "wednesday", text: "Wednesday"
    }, {
        value: "thursday", text: "Thursday"
    }, {
        value: "friday", text: "Friday"
    }, {
        value: "saturday", text: "Saturday"
    }, {
        value: "sunday", text: "Sunday"}];

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
                    <div key={`slot-${slot.id}`}>

                        <select id={`day-${slot.id}`}>
                            {meetingDayOptions.map(option => (
                                <option key={`${option.value}-${slot.id}`} value={option.value} selected={slot.day === option.text}>{option.text}</option>
                                ))}
                        </select>
                        <select id={`startHour-${slot.id}`}>
                            {hourOptions.map(option => (
                                <option key={`startHour-${option.value}-${slot.id}`} value={option.value} selected = {slot.startHour == option.value}>{option.text}</option>
                            ))}
                        </select>
                        <select id={`startMinute-${slot.id}`}>
                            {minuteOptions.map(option => (
                                <option key={`startMinute-${option.value}-${slot.id}`} value={option.value} selected = {slot.startMinute == option.value}>{option.text}</option>
                            ))}
                        </select>
                        <select id={`endHour-${slot.id}`}>
                            {hourOptions.map(option => (
                                <option key={`endHour-${option.value}-${slot.id}`} value={option.value} selected = {slot.endHour == option.value}>{option.text}</option>
                            ))}
                        </select>
                        <select id={`endMinute-${slot.id}`}>
                            {minuteOptions.map(option => (
                                <option key={`endMinute-${option.value}-${slot.id}`} value={option.value} selected = {slot.endMinute == option.value}>{option.text}</option>
                            ))}
                        </select>
                    </div>
                ))}
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
