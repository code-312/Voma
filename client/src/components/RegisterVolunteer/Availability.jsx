import React, { useContext, useState } from 'react';
import Timeslot from '../ProjectPage/Timeslot';
import { VolunteerContext } from '../../lib/VolunteerProvider';
import { addNewItem, deleteItem } from '../../lib/util';

const Availability = () => {
    const Volunteer = useContext(VolunteerContext);
    const [slotCopy, setSlotCopy] = useState(Volunteer.timeslots || []);


    const timeslotListener = (newSlot) => {
      const index = slotCopy.findIndex(slot => slot.id === newSlot.id);
      if (index !== -1) {
          const timeslotsCopy = [...slotCopy];
          timeslotsCopy[index] = newSlot;
          setSlotCopy(timeslotsCopy);
      }
  }
  
  const addNewTimeslot = () => {
      const copy = addNewItem(slotCopy, 
          { day: "Monday", startHour: 0, startMinute: 0, endHour: 0, endMinute: 0 });
      setSlotCopy(copy);
  }
  
  const deleteTimeslot = async (id) => {
      const timeslotCopy = deleteItem(id, slotCopy);
      setSlotCopy(timeslotCopy);
  }

    return (
        <div>
            <h1>Availability</h1>
            <p>Select when you will be most available for meetings and collaboration sessions.</p>
            <Timeslot
                onChange={timeslotListener}
                isEditing
                timeslots={slotCopy}
                addNewTimeslot={addNewTimeslot}
                deleteTimeslot={deleteTimeslot}
            />
        </div>
    )
};

export default Availability;
