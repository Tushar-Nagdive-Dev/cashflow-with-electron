const { DataSource } = require('typeorm');
const config = require('./typeorm.config');

const AppDataSource = new DataSource(config);

const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('api', {
  test: () => console.log('Preload script is running!'),
});


console.log('Preload script is running!');

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established!');
    console.log('Entities:', AppDataSource.options.entities);
  })
  .catch((error) => console.error('Database connection failed:', error));
