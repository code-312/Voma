'use strict';
const { DataTypes, queryInterface, Sequelize } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('VolunteerSkills', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      volunteerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      skillId: {
        type: Sequelize.INTEGER,
        allowNull: false,
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
    });
    await queryInterface.addConstraint('VolunteerSkills', {
      fields: ['volunteerId'],
      type: 'foreign key',
      references: {
        table: 'volunteers',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
    await queryInterface.addConstraint('VolunteerSkills', {
      fields: ['skillId'],
      type: 'foreign key',
      references: {
        table: 'skills',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('VolunteerSkills');
  },
};
