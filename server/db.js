const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "M@ving4ward",
  host: "localhost",
  port: 5432,
  database: "perntodo"
});

module.exports = pool;

// contains login information for pg database to query from