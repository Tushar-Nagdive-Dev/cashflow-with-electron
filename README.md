**CashFlowApp Development - Phase 1 & Phase 2: End-to-End Documentation**

---

## **Phase 1: Setting Up Electron Framework**

### **Objective**
To set up the Electron framework and build the foundation for the CashFlowApp desktop application.

---

### **Steps**

#### 1. **Initialize the Project**
1. Create a new folder for your project:
   ```bash
   mkdir cashflowapp
   cd cashflowapp
   npm init -y
   ```
2. Install Electron as a development dependency:
   ```bash
   npm install electron --save-dev
   ```

#### 2. **Create Main Electron File**
Create a `main.js` file in the root directory to initialize Electron:

```javascript
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
    icon: path.join(__dirname, 'assets/icons/cashflow_ice.ico'),
  });

  console.log(":::::: " + __dirname);

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

#### 3. **Create a Basic HTML File**
Create an `index.html` file for the Electron window:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CashFlowApp</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background: linear-gradient(135deg, #4caf50, #8bc34a);
      color: #ffffff;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  </style>
</head>
<body>
  <h1>Welcome to CashFlowApp</h1>
</body>
</html>
```

#### 4. **Run the Application**
Add the `start` script in `package.json`:
```json
"scripts": {
  "start": "electron ."
}
```
Run the application:
```bash
npm start
```

---

## **Phase 2: Integrating Angular with Electron**

### **Objective**
To integrate Angular into the Electron framework and organize the application into a proper directory structure.

---

### **Steps**

#### 1. **Set Up Angular Project**
1. Navigate to the project root and create an Angular project:
   ```bash
   mkdir angular
   cd angular
   ng new cashflowapp-ui
   ```
2. Adjust the `outputPath` in `angular.json` to build the Angular app into the Electron project:
   ```json
   "outputPath": "../dist/angular"
   ```

#### 2. **Build Angular Application**
Run the Angular build command with the correct base path:
```bash
ng build --base-href ./
```

#### 3. **Update Electron Configuration**
Modify `main.js` to dynamically load Angular:

```javascript
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
    icon: path.join(__dirname, 'assets/icons/cashflow_ice.ico'),
  });

  const isDev = process.env.NODE_ENV === 'development';
  const DEV_URL = 'http://localhost:4200/';
  const PROD_URL = `file://${path.join(__dirname, '../dist/angular/index.html')}`;

  const appURL = isDev ? DEV_URL : PROD_URL;
  mainWindow.loadURL(appURL);

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load:', errorDescription);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

#### 4. **Automate Build and Run**
Update `package.json` to include scripts for building and running the application:

```json
"scripts": {
    "build:angular": "cd UI/cashflowapp-ui && ng build --base-href ./",
    "start:electron": "NODE_ENV=production npx electron electron/main.js",
    "start": "npm run build:angular && npm run start:electron",
    "dev:angular": "cd UI/cashflowapp-ui && ng serve",
    "dev:electron": "concurrently \"npm run dev:angular\" \"wait-on http://localhost:4200 && NODE_ENV=development npx electron electron/main.js\""
  }
```

#### 5. **Install Supporting Packages**
Install `concurrently` and `wait-on` to run Angular and Electron together in development mode:
```bash
npm install concurrently wait-on --save-dev
```

#### 6. **Run the Application**
1. **For Development:**
   ```bash
   npm run dev:electron
   ```
   - This starts the Angular development server and Electron together.

2. **For Production:**
   ```bash
   npm start
   ```
   - This builds the Angular application and starts Electron in production mode.

---

### **Deliverables for Phase 1 & Phase 2**
1. **Phase 1:** Basic Electron setup with a working `index.html`.
2. **Phase 2:** Angular successfully integrated with Electron, supporting both development (`localhost`) and production (`dist` build).

---


