const { Pool } = require('pg');
// const conString = require('./server_settings/elephantLogin.js');

// const pool = new Pool({
//   connectionString: conString,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });
const pool = new Pool ({
  username: 'jackychow',
  password: 'AyBayBay1',
  database: 'goblinsharktest',
  host: 'localhost',
  port: 5432,
});

module.exports = pool;
