require("dotenv").config();
const { Pool } = require("pg");

// PostgreSQL client pool
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
