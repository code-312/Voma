import React, { useEffect } from 'react';
import Timeslot from '../ProjectPage/Timeslot';
import RequiredLabel from '../RequiredLabel';
import { addNewItem, deleteItem } from '../../lib/util';

const Availability = ({ timeslots, updateInfo, setCanProceed }) => {
    useEffect(() => {
        setCanProceed(timeslots.length > 0);
    }, [timeslots, setCanProceed]);

    
    const timeslotListener = (newSlot) => {
      const index = timeslots.findIndex(slot => slot.id === newSlot.id);
      if (index !== -1) {
          const timeslotsCopy = [timeslots];
          timeslotsCopy[index] = newSlot;
  
          updateInfo({
            timeslots: timeslotsCopy
          });
      }
  }
  
  const addNewTimeslot = () => {
      const copy = addNewItem(timeslots, 
          { day: "Monday", startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 });
      updateInfo({
        timeslots: copy
      });
  }
  
  const deleteTimeslot = async (id) => {
      const timeslotCopy = deleteItem(id, timeslots);
      updateInfo({
        timeslots: timeslotCopy
      });
  }

    return (
        <div>
            <h1>Availability</h1>
            <p>Select when you will be most available for meetings and collaboration sessions.</p>
            <RequiredLabel />
            <Timeslot
                onChange={timeslotListener}
                isEditing
                timeslots={timeslots}
                addNewTimeslot={addNewTimeslot}
                deleteTimeslot={deleteTimeslot}
                showLabel={false}
            />
        </div>
    )
};

export default Availability;
