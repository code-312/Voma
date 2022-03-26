const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}`});
const { addAssociations } = require('./models/addAssociations');

const { DB_NAME, DB_USER, DB_HOST } = process.env;
const DB_PASSWORD = process.env.DB_PASSWORD || null; // Lando requires a blank password.

const options = {
  host: DB_HOST,
  dialect: 'postgres',
};

if (process.env.DB_PORT) { // (optional) Custom port.
  options['port'] = process.env.DB_PORT;
}

const seq = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, options);

const modelDefiners = [
	require('./models/volunteer.model'),
	require('./models/project.model'),
	require('./models/skill.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(seq, DataTypes);
}

addAssociations(seq)

const sync = async () => {
    console.log('Syncing the database');
    try {
      await seq.sync({ alter: true });
      console.log('Database synced!');
    } catch (err) {
      console.log(`Err :( ${err})`);
    }
}

sync();