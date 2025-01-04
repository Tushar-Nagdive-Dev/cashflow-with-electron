"use strict";

var _require = require('electron'),
  app = _require.app,
  BrowserWindow = _require.BrowserWindow;
var path = require('path');
var mainWindow;
app.on('ready', function () {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icons/cashflow_ice.ico')
  });
  mainWindow.webContents.openDevTools();
  console.log('Preload Path:', path.join(__dirname, 'preload.js'));
  console.log(":::::: " + __dirname);

  // Switch between Development and Production URLs
  var isDev = process.env.NODE_ENV === 'development';
  var DEV_URL = 'http://localhost:4200/';
  var PROD_URL = "file://".concat(path.join(__dirname, '../UI/dist/cashflowapp-ui/browser/index.html'));
  var appURL = isDev ? DEV_URL : PROD_URL;
  console.log("Loading URL: ".concat(appURL));
  mainWindow.loadURL(appURL);

  // Handle load failures
  mainWindow.webContents.on('did-fail-load', function (event, errorCode, errorDescription) {
    console.error('Failed to load:', errorDescription);
  });
});
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});