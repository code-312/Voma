'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('projects', 'description', {
          type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('projects', 'tech', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('projects', 'goodFitFor', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('projects', 'comment', {
        type: Sequelize.TEXT
      }),
      queryInterface.changeColumn('projects', 'projectStatement', {
        type: Sequelize.TEXT
      }),
    ])
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.changeColumn('projects', 'description', {
          type: Sequelize.STRING
      }),
      queryInterface.changeColumn('projects', 'tech', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('projects', 'goodFitFor', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('projects', 'comment', {
        type: Sequelize.STRING
      }),
      queryInterface.changeColumn('projects', 'projectStatement', {
        type: Sequelize.STRING
      }),
    ])
  }
};
