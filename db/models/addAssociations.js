const { sequelize } = require('sequelize');

function addAssociations(sequelize) {
  const {skill, volunteer, project, link} = sequelize.models;

  volunteer.belongsToMany(skill, {through: "VolunteerSkills"});
  skill.belongsToMany(volunteer, {through: "VolunteerSkills"});

  project.hasMany(volunteer);
  volunteer.belongsTo(project);

  project.hasMan(link);
  link.belongsTo(project);
}

module.exports = { addAssociations };