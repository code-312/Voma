const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const { NODE_ENV, DB_NAME, DB_USER, DB_HOST } = process.env;
const DB_PASSWORD = process.env.DB_PASSWORD || null; // Lando requires a blank password.

const { addAssociations } = require('./models/addAssociations');

const options = {
  host: DB_HOST,
  dialect: 'postgres',
}

if (process.env.DB_PORT) { // (optional) Custom port.
  options['port'] = process.env.DB_PORT;
}

if (NODE_ENV == 'development.local') { // Allow http.
  options['dialectOptions'] = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const seq = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, options);

seq.authenticate().then(() => {
  if (NODE_ENV == 'development.local') {
    console.log('Database successfully connected.');
  }
}).catch(err => {
  if (NODE_ENV == 'development.local') {
    console.error(err);
  }
});

const modelDefiners = [
	require('./models/volunteer.model'),
	require('./models/project.model'),
	require('./models/skill.model'),
  require('./models/volunteerSkills.model'),
  require('./models/admin.model')
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(seq, DataTypes, bcrypt);
}

addAssociations(seq)

module.exports = seq;