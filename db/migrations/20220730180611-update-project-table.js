'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn(
        'projects', // table name
        'meetingCadence', // new field name
        {
          type: Sequelize.STRING,
          defaultValue: '',
          allowNull: false,
        },
      ),
      queryInterface.addColumn('projects', 'projectStatement', {
        type: Sequelize.STRING,
        defaultValue: '',
        allowNull: false,
      }),
      queryInterface.addColumn('projects', 'deliverables', {
        type: Sequelize.ARRAY(Sequelize.STRING),
        defaultValue: [],
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('projects', 'meetingCadence'),
      queryInterface.removeColumn('projects', 'projectStatement'),
      queryInterface.removeColumn('projects', 'deliverables'),
    ]);
  },
};
