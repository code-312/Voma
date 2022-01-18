const { Sequelize } = require('sequelize');
const { NODE_ENV, DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;
const configureSSL = NODE_ENV === 'development.local';

const options = {
  host: DB_HOST,
  dialect: 'postgres',
}

if (configureSSL) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

const seq = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'postgres',
  ...options
});

const modelDefiners = [
	require('./models/volunteer.model'),
	require('./models/project.model'),
	require('./models/skill.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(seq);
}
  
module.exports = seq;