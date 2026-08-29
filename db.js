const { Pool } = require('pg');
require('dotenv').config();

// Initialize the connection pool using the URI from your .env file
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection instantly
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
  } else {
    console.log('Connected to PostgreSQL successfully at:', res.rows[0].now);
  }
});

module.exports = pool;
