'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'volunteers', // table name
        'local', // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false
        },
      ),
      queryInterface.addColumn(
        'volunteers',
        'goal',
        {
          type: Sequelize.STRING,
          defaultValue: ""
        },
      ),
      queryInterface.addColumn(
        'volunteers',
        'experience',
        {
          type: Sequelize.STRING,
          defaultValue: ""
        },
      ),
      queryInterface.addColumn(
        'volunteers',
        'leadershipRole',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: []
        },
      ),
      queryInterface.addColumn(
        'volunteers',
        'backendTech',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: []
        },
      ),
      queryInterface.addColumn(
        'volunteers',
        'frontendTech',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: []
        },
      ),
      queryInterface.addColumn(
        'volunteers',
        'webtools',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: []
        },
      ),
      queryInterface.addColumn(
        'volunteers',
        'webPlatforms',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: []
        },
      ),
      queryInterface.removeColumn(
        'volunteers',
        'completedTasks',
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn(
        'volunteers', // table name
        'local', // new field name
      ),
      queryInterface.removeColumn(
        'volunteers',
        'goal',
      ),
      queryInterface.removeColumn(
        'volunteers',
        'experience',
      ),
      queryInterface.removeColumn(
        'volunteers',
        'leadershipRole',
      ),
      queryInterface.removeColumn(
        'volunteers',
        'backendTech',
      ),
      queryInterface.removeColumn(
        'volunteers',
        'frontendTech',
      ),
      queryInterface.removeColumn(
        'volunteers',
        'webtools',
      ),
      queryInterface.removeColumn(
        'volunteers',
        'webPlatforms',
      ),
      queryInterface.addColumn(
        'volunteers',
        'completedTasks',
      ),
    ]);
  }
};
