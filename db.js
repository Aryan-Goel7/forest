const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  database: "Forest",
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 20000,
});

module.exports = pool;
