const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false, // Secure configuration
      contextIsolation: true, // Prevent access to Node.js APIs
      preload: path.join(__dirname, 'preload.js'), // Expose secure APIs to renderer
    },
    icon: path.join(__dirname, 'assets/icons/cashflow_ice.ico'),
  });

  const isDev = process.env.NODE_ENV === 'development';
  const DEV_URL = 'http://localhost:4200/';
  const PROD_URL = `file://${path.join(__dirname, '../UI/dist/cashflowapp-ui/browser/index.html')}`;

  const appURL = isDev ? DEV_URL : PROD_URL;
  console.log(`Loading URL: ${appURL}`);
  mainWindow.loadURL(appURL);

  // Handle load failures
  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
