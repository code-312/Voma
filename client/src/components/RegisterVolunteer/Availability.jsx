import React, { useContext, useState } from 'react';
import Timeslot from '../ProjectPage/Timeslot';
import { VolunteerContext } from '../../lib/VolunteerProvider';
import { addNewItem, deleteItem } from '../../lib/util';

const Availability = ({ timeslots, updateInfo }) => {
    const Volunteer = useContext(VolunteerContext);
    // const [slotCopy, setSlotCopy] = useState(Volunteer.timeslots || []);


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
