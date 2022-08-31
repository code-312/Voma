const { faker } = require('@faker-js/faker');


const createRandomUser = () => {
    const tasks = faker.helpers.arrayElements(["Watch onboarding videos", "Submit passcode validation", "Submit passcode validation"]);
    const completedTasks = tasks.filter((x, index) => tasks.indexOf(x) == index);
  return {
    name: faker.name.fullName(),
    email: faker.internet.email(),
    pronouns: faker.name.gender(true) == 'Male' ? 'He / Him' : 'She / Her',
    employer: faker.company.name(),
    student: Math.floor(Math.random() * 2) == 0 ? 'true' : 'false',
    jobTitle: faker.name.jobTitle(),
    onboardingAttendedAt: faker.date.recent(),
    oneOnOneAttendedAt: faker.date.recent(),
    completedTasks,
    projectId: faker.helpers.arrayElement([null, 1, 2, 3, 5, 5]),
};
}

const getRandomVolunteers = () => {
    const USERS = [];
    Array.from({ length: 20 }).forEach(() => {
      USERS.push(createRandomUser());
    });

    return USERS;
};

module.exports = {
    getRandomVolunteers
};
