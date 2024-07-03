const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    activelyRecruiting: {
      type: DataTypes.BOOLEAN,
    },
    currentNeeds: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    tech: {
      type: DataTypes.STRING,
    },
    goodFitFor: {
      type: DataTypes.STRING,
    },
    comment: {
      type: DataTypes.STRING,
    },
    meetingCadence: {
      type: DataTypes.STRING,
    },
    projectStatement: {
      type: DataTypes.STRING,
    },
    deliverables: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    active: {
      type: DataTypes.BOOLEAN,
    },
  });
  return Project;
};
