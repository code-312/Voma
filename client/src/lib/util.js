export const deleteItem = (id, array) => {
  const copy = [...array];
  const index = copy.findIndex((slot) => slot.id === id);
  copy.splice(index, 1);
  return copy;
};

export const addNewItem = (array, defaultValues) => {
  const copy = [...array];
  // generate temp random id to keep track of updates
  const valueArray = new Uint32Array(1);
  window.crypto.getRandomValues(valueArray);
  copy.push({ id: valueArray[0], ...defaultValues });

  return copy;
};

export const allValid = (fields) => fields.every((field) => !!field);

export const allArraysPopulated = (arrs) => arrs.every((arr) => arr && arr.length > 0);

export const checkBoxListener = (e, volunteer, updateFn) => {
  const { name, value, checked } = e.currentTarget;
  const copy = { ...volunteer };
  let arrCopy = [...copy[name]];

  if (checked) {
    arrCopy = [...arrCopy, value];
  } else {
    arrCopy.splice(arrCopy.indexOf(value), 1);
  }

  updateFn(name, arrCopy);
};


export const determineAvailabilityMatch = (volunteerTimeslots, projectTimeslots) => projectTimeslots.every((slot) => {
    const days = volunteerTimeslots.filter(volSlot => volSlot.day === slot.day); 
    const times = days.filter(daySlot => daySlot.startHour <= slot.startHour && daySlot.endHour >= slot.endHour);

    return times.length > 0;
});

export const determineSkillMatch = (volSkills, projectSkills) => (
  volSkills.some(skill => projectSkills.indexOf(skill.name) > -1)
);

export const getProjectMatchScore = (volunteer, project) => {
  const available = determineAvailabilityMatch(volunteer.Timeslots, project.Timeslots) ? 1 : 0;
  const skill = determineSkillMatch(volunteer.skills, project.currentNeeds) ? 1 : 0;
  
  return {
    available,
    skill,
    total: available + skill
  };
}

export const getScoredProjects = (volunteer, projects) => {
  const gradedProjects = [];
  projects.forEach((project) => {
    const projCopy = {...project};
    projCopy.score = getProjectMatchScore(volunteer, project);
    gradedProjects.push(projCopy);
  });

  return gradedProjects.sort((a, b) => b.score.total - a.score.total);
}

export const getPlainTextMeetingTimes = (timeslots) => {
  const days = [];
  const times = [];
  const today = new Date();
  if (timeslots) {
    timeslots.forEach((slot) => {
      days.push(slot.day);

      const startTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDay(),
        slot.startHour,
        slot.startMinute,
      );
      const endTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDay(),
        slot.endHour,
        slot.endMinute,
      );
      times.push(
        `${slot.day} from ${startTime.toLocaleTimeString()} - ${endTime.toLocaleTimeString()}`,
      );
    });
  }
    return times;
};