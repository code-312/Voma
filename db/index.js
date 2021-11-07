const { Sequelize } = require('sequelize');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const seq = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      }
    }
});

const modelDefiners = [
	require('./models/volunteer.model'),
	require('./models/project.model'),
	require('./models/skill.model'),
];

for (const modelDefiner of modelDefiners) {
	modelDefiner(seq);
}

const test = async () => {
  console.log('trying to connect');
  try {
    await seq.authenticate();
    console.log('Connection success!');
  } catch (err) {
    console.log(`Err :( ${err}`);
  }
}

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
  
module.exports = seq;