'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'projects', // table name
        'activelyRecruiting', // new field name
        {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },
      ),
      queryInterface.addColumn(
        'projects',
        'currentNeeds',
        {
          type: Sequelize.ARRAY(Sequelize.STRING),
          defaultValue: [],
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'projects',
        'tech',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'projects',
        'goodFitFor',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
      queryInterface.addColumn(
        'projects',
        'comment',
        {
          type: Sequelize.STRING,
          allowNull: true,
        },
      ),
    ]);
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('projects', 'activelyRecruiting'),
      queryInterface.removeColumn('projects', 'currentNeeds'),
      queryInterface.removeColumn('projects', 'tech'),
      queryInterface.removeColumn('projects', 'goodFitFor'),
      queryInterface.removeColumn('projects', 'comment'),
    ]);
  }
};
