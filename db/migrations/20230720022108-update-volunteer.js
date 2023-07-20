'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'volunteers', // table name
        'projectAssignmentAccepted', // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'volunteers',
        'active',
        {
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          allowNull: false,
        },
      ),
      queryInterface.removeColumn(
        'volunteers',
        'onboardingAttendedAt',
      ),
      queryInterface.removeColumn(
        'volunteers',
        'oneOnOneAttendedAt',
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'volunteers', // table name
        'projectAssignmentAccepted', // new field name
      ),
      queryInterface.removeColumn(
        'volunteers',
        'active',
      ),
      queryInterface.addColumn(
        'volunteers',
        'onboardingAttendedAt',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'volunteers',
        'oneOnOneAttendedAt',
        {
          type: Sequelize.DATE,
          allowNull: true,
        },
      ),
    ]);
  }
};
