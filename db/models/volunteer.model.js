const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize, DataTypes) => {
	const Volunteer = sequelize.define('volunteer', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            isEmail: true
        },
        slackUserId: {
            type: DataTypes.STRING
        },
        pronouns: {
            type: DataTypes.STRING
        },
        employer: {
            type: DataTypes.STRING
        },
        student: {
            type: DataTypes.STRING
        },
        jobTitle: {
            type: DataTypes.STRING
        },
        projectAssignmentAccepted: {
            type: DataTypes.BOOLEAN
        },
        active: {
            type: DataTypes.BOOLEAN
        },
        completedTasks: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        projectId: {
            type: DataTypes.INTEGER,
        }
    });
    return Volunteer;
};