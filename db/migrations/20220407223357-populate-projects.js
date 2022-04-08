'use strict';
const {queryInterface, Sequelize} = require('sequelize')

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('projects', [
      {name: 'Code for Chicago Website', description: 'Help build our website and design system for the brigade network'},
      {name: 'Chicago Council on Science and Technology', description: 'Modernizing a website to increase volunteer and event participation'},
      {name: 'Cannabis Equity Illinois Coalition', description: 'Improving UX/UI to align with org goals and built to scale.'},
      {name: 'Between Friends', description: 'Reducing client obstacles to updating the website to reach out to more users.'},
      {name: 'Voma', description: 'An internal project to expedite the volunteer onboarding process.'},
  ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;

     await queryInterface.bulkDelete(
       'projects',
       {[Op.or]: [
          {name: 'Code for Chicago Website'},
          {name: 'Chicago Council on Science and Technology',},
          {name: 'Cannabis Equity Illinois Coalition'},
          {name: 'Between Friends'},
          {name: 'Voma'},
        ]}
       );
  }
};
