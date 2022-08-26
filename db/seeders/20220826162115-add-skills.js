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
        name: 'UX/UI Design/Research / Visual Design',
      }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('skills', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
