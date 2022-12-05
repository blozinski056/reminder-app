const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "c0d1ngw/sql",
  host: "localhost",
  port: 5432,
  database: "reminderapp",
});

module.exports = pool;
