const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}`});
const { addAssociations } = require('./models/addAssociations');

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const seq = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'postgres',
});

const modelDefiners = [
  require('./models/volunteer.model'),
  require('./models/project.model'),
  require('./models/skill.model'),
  require('./models/admin.model')
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