/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React, { useState, useEffect } from 'react';
import { PlusCircle } from 'lucide-react';
import { Label3, Label4, BodyText2 } from '../../styles/components/Typography';
import { ProfileInfoContainer } from '../../styles/components/VolunteerModal.style';
import { ProjectTimeslotContainer, ProjectTimeslotRow } from '../../styles/pages/ProjectPage.style';
import Select from '../Select';
import Button from '../Button';
import { getPlainTextMeetingTimes } from '../../lib/util';

const Timeslot = ({
  onChange,
  isEditing,
  timeslots,
  addNewTimeslot,
  deleteTimeslot,
  showLabel = true,
}) => {
  const [meetingTimes, setMeetingTimes] = useState([]);

  useEffect(() => {
    if (timeslots) {
      const times = getPlainTextMeetingTimes(timeslots);

      setMeetingTimes(times.join(', '));
    }
  }, [timeslots]);

  const updateTimeslot = (id, key, value) => {
    const newSlot = { ...timeslots.find((slot) => slot.id === id) };
    newSlot[key] = value;
    onChange(newSlot);
  };

  const meetingDayOptions = [
    {
      value: 'Monday',
      text: 'Monday',
    },
    {
      value: 'Tuesday',
      text: 'Tuesday',
    },
    {
      value: 'Wednesday',
      text: 'Wednesday',
    },
    {
      value: 'Thursday',
      text: 'Thursday',
    },
    {
      value: 'Friday',
      text: 'Friday',
    },
    {
      value: 'Saturday',
      text: 'Saturday',
    },
    {
      value: 'Sunday',
      text: 'Sunday',
    },
  ];

  const formatTime = (time) => {
    let value = `${time}`;
    if (time < 10) {
      value = `0${time}`;
    }
    return value;
  };
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
        <ProfileInfoContainer>
          {showLabel && <Label3>Meeting Days and Times</Label3>}
          {timeslots.map((slot) => (
            <ProjectTimeslotRow key={`slot-${slot.id}`}>
              <ProjectTimeslotContainer>
                <Label4>Day</Label4>
                <Select
                  options={meetingDayOptions}
                  name="day"
                  currentValue={slot.day}
                  id={slot.id}
                  onChange={updateTimeslot}
                />
              </ProjectTimeslotContainer>
              <ProjectTimeslotContainer>
                <Label4>Start Time</Label4>
                <Select
                  options={hourOptions}
                  name="startHour"
                  currentValue={slot.startHour}
                  id={slot.id}
                  onChange={updateTimeslot}
                />
                <Select
                  options={minuteOptions}
                  id={slot.id}
                  currentValue={slot.startMinute}
                  name="startMinute"
                  onChange={updateTimeslot}
                />
              </ProjectTimeslotContainer>
              <ProjectTimeslotContainer>
                <Label4>End Time</Label4>
                <Select
                  options={hourOptions}
                  id={slot.id}
                  currentValue={slot.endHour}
                  name="endHour"
                  onChange={updateTimeslot}
                />
                <Select
                  options={minuteOptions}
                  id={slot.id}
                  currentValue={slot.endMinute}
                  name="endMinute"
                  onChange={updateTimeslot}
                />
              </ProjectTimeslotContainer>
              <Button onClick={() => deleteTimeslot(slot.id)} variant="text-only red">
                Delete
              </Button>
            </ProjectTimeslotRow>
          ))}
          <Button variant="fw outline blue" icon={PlusCircle} onClick={addNewTimeslot}>
            Add Timeslot
          </Button>
        </ProfileInfoContainer>
      </>
    );
  }

  return (
    <div>
      <ProfileInfoContainer>
        <Label3>Meeting Days and Times</Label3>
        <BodyText2>{meetingTimes}</BodyText2>
      </ProfileInfoContainer>
    </div>
  );
};

export default Timeslot;
