const { sequelize } = require('sequelize');
// const {VolunteerSkills} = require('./volunteerSkills.model')

// const VolunteerSkills = sequelize.define('VolunteerSkills', {}, {});

function addAssociations(sequelize, VolunteerSkills) {
  const {skill, volunteer} = sequelize.models;

  // volunteer.hasMany(skill);
  // skill.belongsTo(volunteer);

  volunteer.belongsToMany(skill, {through: "VolunteerSkills"});
  skill.belongsToMany(volunteer, {through: "VolunteerSkills"});
}

module.exports = { addAssociations };