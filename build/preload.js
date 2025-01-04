"use strict";

var _require = require('typeorm'),
  DataSource = _require.DataSource;
var config = require('./typeorm.config');
var AppDataSource = new DataSource(config);
var _require2 = require('electron'),
  contextBridge = _require2.contextBridge;
contextBridge.exposeInMainWorld('api', {
  test: function test() {
    return console.log('Preload script is running!');
  }
});
console.log('Preload script is running!');
AppDataSource.initialize().then(function () {
  console.log('Database connection established!');
  console.log('Entities:', AppDataSource.options.entities);
})["catch"](function (error) {
  return console.error('Database connection failed:', error);
});