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
# CashFlowApp Development - Phase 3: Electron and PostgreSQL Integration with TypeORM

---

## **Objective**
The goal of Phase 3 is to:
1. Integrate **Electron** with **PostgreSQL** for database management.
2. Use **TypeORM** as the ORM tool for database interactions.
3. Implement a proper structure for entities and repositories.
4. Configure and test the integration for production and development environments.

---

## **Final Folder Structure**
```
cashflowapp/
├── electron/
│   ├── main.js
│   ├── preload.js
│   ├── typeorm.config.js
│   ├── entities/
│   │   ├── User.js
│   └── repositories/
├── UI/
│   ├── cashflowapp-ui/
│   │   ├── dist/
│   │   ├── src/
│   │   └── angular.json
├── build/
│   ├── main.js
│   ├── preload.js
│   ├── entities/
│       ├── User.js
├── package.json
└── tsconfig.json
```

---

## **Step-by-Step Implementation**

### **Step 1: Configure PostgreSQL and TypeORM**

#### 1.1 Install Dependencies
Install the required packages for database integration and TypeORM:
```bash
npm install pg typeorm reflect-metadata
```

#### 1.2 Create TypeORM Configuration
Create `typeorm.config.js` in the `electron/` directory:
```javascript
const path = require('path');

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'cashflow_dev',
  password: 'connect',
  database: 'cashflow_db',
  synchronize: true, // Auto-create tables (disable in production)
  logging: ['query', 'error'],
  entities: [path.join(__dirname, './entities/*.js')],
};
```

---

### **Step 2: Define Entities**

#### 2.1 Create the User Entity
In `electron/entities/User.js`:
```javascript
const { Entity, PrimaryGeneratedColumn, Column } = require('typeorm');

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id;

  @Column({ type: 'varchar', length: 100 })
  name;

  @Column({ type: 'varchar', unique: true })
  email;

  @Column({ type: 'varchar' })
  password;
}

module.exports = User;
```

#### 2.2 Update `typeorm.config.js`
Ensure the configuration points to the entities:
```javascript
entities: [path.join(__dirname, './entities/*.js')],
```

---

### **Step 3: Initialize Database in Preload**

#### 3.1 Modify `preload.js`
In `electron/preload.js`, initialize the database:
```javascript
const { DataSource } = require('typeorm');
const config = require('./typeorm.config');

const AppDataSource = new DataSource(config);

AppDataSource.initialize()
  .then(() => {
    console.log('Database connection established!');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

console.log('Preload script is running!');
```

---

### **Step 4: Update Electron Main Process**

#### 4.1 Modify `main.js`
Ensure Electron uses the `preload.js` script:
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
      preload: path.join(__dirname, 'preload.js'),
    },
    icon: path.join(__dirname, 'assets/icons/cashflow_ice.ico'),
  });

  const isDev = process.env.NODE_ENV === 'development';
  const DEV_URL = 'http://localhost:4200/';
  const PROD_URL = `file://${path.join(__dirname, '../UI/dist/cashflowapp-ui/browser/index.html')}`;
  const appURL = isDev ? DEV_URL : PROD_URL;

  mainWindow.loadURL(appURL);

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error('Failed to load content:', errorDescription);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

---

### **Step 5: Babel Configuration for Decorator Support**

#### 5.1 Install Babel Dependencies
Install Babel and required plugins:
```bash
npm install @babel/core @babel/cli @babel/plugin-proposal-decorators @babel/preset-env --save-dev
```

#### 5.2 Update `package.json`
Add Babel configuration:
```json
{
  "babel": {
    "presets": ["@babel/preset-env"],
    "plugins": [
      ["@babel/plugin-proposal-decorators", { "legacy": true }]
    ]
  }
}
```

---

### **Step 6: Build and Run**

#### 6.1 Update Scripts in `package.json`
Ensure `package.json` includes:
```json
"scripts": {
  "build:angular": "cd UI/cashflowapp-ui && ng build --base-href ./",
  "build:electron": "babel electron --out-dir build",
  "start:electron": "NODE_ENV=production electron build/main.js",
  "start": "npm run build:angular && npm run build:electron && npm run start:electron",
  "dev:angular": "cd UI/cashflowapp-ui && ng serve",
  "dev:electron": "concurrently \"npm run dev:angular\" \"wait-on http://localhost:4200 && NODE_ENV=development electron electron/main.js\""
}
```

#### 6.2 Build Angular and Electron
Run the following commands:
```bash
npm run build:angular
npm run build:electron
```

#### 6.3 Start the Application
- For development:
  ```bash
  npm run dev:electron
  ```
- For production:
  ```bash
  npm start
  ```

---

### **Testing**

1. **Database Logs**:
   - Verify `Database connection established!` in the console.
   - Check for `CREATE TABLE` SQL statements in the logs.

2. **Verify PostgreSQL Tables**:
   - Connect to PostgreSQL:
     ```bash
     psql -h localhost -U cashflow_dev -d cashflow_db
     ```
   - List tables:
     ```sql
     \dt
     ```
   - Confirm `user` table exists.

3. **Application Testing**:
   - Launch the app and check UI functionality.
   - Ensure database interactions (e.g., inserting users) work as expected.

---

### **Deliverables for Phase 3**
1. Fully integrated Electron app with PostgreSQL using TypeORM.
2. A structured directory for entities and repositories.
3. Working build and development pipelines.
4. Verified database connectivity and table creation.

---

### Next Steps
Move to **Phase 4**, where we implement advanced CRUD operations and IPC communication for backend-frontend interactions.



