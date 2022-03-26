const { Sequelize, DataTypes } = require('sequelize');

const { NODE_ENV, DB_NAME, DB_USER, DB_HOST } = process.env;
const DB_PASSWORD = process.env.DB_PASSWORD || null; // Lando requires a blank password.

const configureSSL = NODE_ENV === 'development.local';
const { addAssociations } = require('./models/addAssociations');

const options = {
  host: DB_HOST,
  dialect: 'postgres',
}

if (process.env.DB_PORT) { // (optional) Custom port.
  options['port'] = process.env.DB_PORT;
}

if (configureSSL) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const seq = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, options);

const modelDefiners = [
	require('./models/volunteer.model'),
	require('./models/project.model'),
	require('./models/skill.model'),
  require('./models/volunteerSkills.model')
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(seq, DataTypes);
}

addAssociations(seq)

module.exports = seq;