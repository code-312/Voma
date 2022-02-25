const { sequelize } = require('sequelize');

function addAssociations(sequelize) {
  const {skill, volunteer} = sequelize.models;

  volunteer.belongsToMany(skill, {through: "VolunteerSkills"});
  skill.belongsToMany(volunteer, {through: "VolunteerSkills"});
}

module.exports = { addAssociations };