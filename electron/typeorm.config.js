const path = require('path');

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cashflow_dev', // Replace with your username
  password: 'connect',     // Replace with your password
  database: 'cashflow_db', // Replace with your database name
  synchronize: true,       // Auto-create tables (use only in development)
  logging: ['query', 'error'], // Enable logging for debugging
  entities: [path.join(__dirname, './entities/*.js')], // Ensure correct path
};
