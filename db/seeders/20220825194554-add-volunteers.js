'use strict';
const { getRandomVolunteers } = require('../../util/randomData');
const volunteers = getRandomVolunteers();

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('volunteers', 
      volunteers,
    );
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('volunteers', null, {});
  }
};
