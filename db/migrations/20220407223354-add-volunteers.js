'use strict';
const { DataTypes, queryInterface, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('volunteers', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        isEmail: true,
      },
      slackUserId: {
        type: DataTypes.STRING,
      },
      pronouns: {
        type: DataTypes.STRING,
      },
      employer: {
        type: DataTypes.STRING,
      },
      student: {
        type: DataTypes.STRING,
      },
      jobTitle: {
        type: DataTypes.STRING,
      },
      onboardingAttendedAt: {
        type: DataTypes.DATE,
      },
      oneOnOneAttendedAt: {
        type: DataTypes.DATE,
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE,
      },
      projectId: {
        type: Sequelize.INTEGER,
      },
    });

    await queryInterface.addConstraint('volunteers', {
      fields: ['projectId'],
      type: 'foreign key',
      references: {
        table: 'projects',
        field: 'id',
      },
      onDelete: 'set null',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('volunteers');
  },
};
