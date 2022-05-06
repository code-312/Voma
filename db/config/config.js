const env = process.env.NODE_ENVIRONMENT || 'local'

const test = require('dotenv').config({path: `${__dirname}/./../../.env.${env}`});
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const configOptions = {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: 'postgres'
};

if (env !== 'local') {
    configOptions.dialectOptions = {
        ssl: {
            rejectUnauthorized: false
        },
    }
};

module.exports = {
    development: configOptions, 
};
