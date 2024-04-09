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
        projectId: {
            type: DataTypes.INTEGER,
        },
        local: {
            type: DataTypes.BOOLEAN
        }, 
        goal: {
            type: DataTypes.STRING
        },
        experience: {
            type: DataTypes.STRING
        },
        leadershipRole: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        backendTech: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        frontendTech: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        webtools: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
        webPlatforms: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        },
    });
    return Volunteer;
};