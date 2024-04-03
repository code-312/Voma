'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'projects', // table name
      'active', // new field name
      {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },
    );
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('projects', 'active');
  }
};
