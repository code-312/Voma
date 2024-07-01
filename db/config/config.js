const env = process.env.NODE_ENVIRONMENT || 'local';
console.log(env);

const test = require('dotenv').config({ path: `${__dirname}/../../.env.${env}` });
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

console.log(DB_HOST);
const configOptions = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
};

if (env !== 'local') {
  configOptions.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

module.exports = {
  development: configOptions,
};
