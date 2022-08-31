'use strict';
const { models } = require('../index');
const { faker } = require('@faker-js/faker');

module.exports = {
  async up (queryInterface, Sequelize) {
    const volunteers = await models.volunteer.findAll()
                           .catch(err => error = err);
    const skills = await models.skill.findAll()
      .catch(err => error = err);

    const skillIds = skills.map((skill) => skill.id);
    
    const volunteerSkills = volunteers.map((vol) => {
      return {
        volunteerId: vol.id,
        skillId: faker.helpers.arrayElement(skillIds)
      }
    });

    await queryInterface.bulkInsert('VolunteerSkills', volunteerSkills, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('VolunteerSkills', null, {});
  }
};
