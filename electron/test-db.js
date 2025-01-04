const { DataSource } = require('typeorm');
const config = require('./typeorm.config');

const AppDataSource = new DataSource(config);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection successful!');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });
