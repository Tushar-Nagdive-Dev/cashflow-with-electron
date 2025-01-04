"use strict";

var _require = require('typeorm'),
  DataSource = _require.DataSource;
var config = require('./typeorm.config');
var AppDataSource = new DataSource(config);
AppDataSource.initialize().then(function () {
  console.log('Database connection successful!');
})["catch"](function (error) {
  console.error('Database connection failed:', error);
});