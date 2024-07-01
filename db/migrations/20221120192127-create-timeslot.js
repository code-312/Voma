'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Timeslots', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      day: {
        type: Sequelize.STRING,
      },
      startHour: {
        type: Sequelize.INTEGER,
      },
      startMinute: {
        type: Sequelize.INTEGER,
      },
      endHour: {
        type: Sequelize.INTEGER,
      },
      endMinute: {
        type: Sequelize.INTEGER,
      },
      volunteerId: {
        type: Sequelize.INTEGER,
      },
      projectId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Timeslots');
  },
};
