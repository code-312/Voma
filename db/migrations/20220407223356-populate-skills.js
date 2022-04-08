'use strict';
const {queryInterface, Sequelize} = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('skills', [
      {name: 'Content Strategy'},
      {name: 'Data Analytics'},
      {name: 'Front-End or Back-End Development'},
      {name: 'Project Management'},
      {name: 'Product Management'},
      {name: 'UX/UI Design/Research / Visual Design'}
  ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;

     await queryInterface.bulkDelete(
       'skills',
       {[Op.or]: [
        {name: 'Content Strategy'},
        {name: 'Data Analytics'},
        {name: 'Front-End or Back-End Development'},
        {name: 'Project Management'},
        {name: 'Product Management'},
        {name: 'UX/UI Design/Research / Visual Design'}
        ]}
       );
  }
};
