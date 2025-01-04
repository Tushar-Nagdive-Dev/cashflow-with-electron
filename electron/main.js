const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'assets/icons/cashflow_ice.ico')
  });

  console.log(":::::: "+__dirname);

  // Load the local index.html file
  // mainWindow.loadURL(`file://${__dirname}/index.html`);

  // Development MODE
  const DEV_URL = 'http://localhost:4200/';

  // Build MODE
  const PROD_URL = `file://${path.join(__dirname, '../UI/dist/cashflowapp-ui/browser/index.html')}`;
  
  mainWindow.loadURL(PROD_URL);

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
  });
  
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
});
