const { sequelize } = require('sequelize');
const seq = require('..');

function addAssociations(sequelize) {
  const {skill, volunteer, project, Link} = sequelize.models;

  volunteer.belongsToMany(skill, {through: "VolunteerSkills"});
  skill.belongsToMany(volunteer, {through: "VolunteerSkills"});

  project.hasMany(volunteer);
  volunteer.belongsTo(project);

  project.hasMany(Link);
  Link.belongsTo(project);
}

module.exports = { addAssociations };