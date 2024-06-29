'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn(
      'volunteers', // table name
      'completedTasks', // new field name
      {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: false,
      },
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn('volunteers', 'completedTasks');
  },
};
