'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('skills', [{
        name: 'Content Strategy',
      }, {
        name: 'Data Analytics',
      }, {
        name: 'Front-End or Back-End Development',
      }, {
        name: 'Project Management',
      }, {
        name: 'Product Management',
      }, {
        name: 'UX Designer',
      }, {
        name: 'UI / Visual Designer',
      }, {
        name: 'UX Researcher',
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('skills', null, {});
  }
};
