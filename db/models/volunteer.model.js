const { DataTypes } = require('sequelize');

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = (sequelize) => {
	sequelize.define('volunteer', {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
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
        onboardingAttendedAt: {
            type: DataTypes.DATE
        },
        oneOnOneAttendedAt: {
            type: DataTypes.DATE
        },
    });
    /* id, createdAt and updatedAt are created and maintained by default by sequelize */
};