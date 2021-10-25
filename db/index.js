const { Pool, Client } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: 'password',
  port: 5432,
})


module.exports = {
  getUsers: async () => {
    try {
      const result = await pool.query('SELECT * FROM users');
      console.log(result);
      return result.rows;
    }
    catch (err) {
      throw new Error(err);
    }
  }
};