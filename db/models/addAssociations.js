const { sequelize } = require('sequelize');
const seq = require('..');

function addAssociations(sequelize) {
  const {skill, volunteer, project, Link, Event, Timeslot} = sequelize.models;

  volunteer.belongsToMany(skill, {through: "VolunteerSkills"});
  skill.belongsToMany(volunteer, {through: "VolunteerSkills"});

  volunteer.hasMany(Event);
  Event.belongsTo(volunteer);

  volunteer.hasMany(Timeslot);
  Timeslot.belongsTo(volunteer);

  project.hasMany(volunteer);
  volunteer.belongsTo(project);

  project.hasMany(Timeslot);
  Timeslot.belongsTo(project);

  project.hasMany(Link);
  Link.belongsTo(project);
}

module.exports = { addAssociations };