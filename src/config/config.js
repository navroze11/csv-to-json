const dotenv = require('dotenv');

/**
 * Load environment variables from .env file, where csv path and database
 * environment variables are configured.
 */
dotenv.load({ path: '../.env.example' });

const config = {
  database: {
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  },
  concurrencyLimit: 2,
  csv: {
    path: process.env.CSV_PATH
  }
};

module.exports = {
  config
};
