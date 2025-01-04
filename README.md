**CashFlowApp Development - Phase 1: Setting Up Electron Framework**

---

### Objective
The goal of **Phase 1** is to set up the Electron framework to build the foundation for the CashFlowApp desktop application.

---

### Steps to Set Up Electron

#### 1. **Initialize the Project**
1. Create a new folder for your project.
2. Run the following commands:
   ```bash
   mkdir cashflowapp
   cd cashflowapp
   npm init -y
   ```
   This creates a `package.json` file with default settings.

#### 2. **Install Electron**
Run the following command to install Electron as a development dependency:
```bash
npm install electron --save-dev
```

#### 3. **Create the Main Electron File**
Create a `main.js` file in the project directory. This file initializes the Electron application.

```javascript
const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    icon: path.join(__dirname, 'assets/icons/icon.png'), // Replace with the correct icon path
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);
});
```

#### 4. **Add Scripts to `package.json`**
Update the `scripts` section of `package.json` to include the following:
```json
"scripts": {
  "start": "electron ."
}
```

#### 5. **Create the HTML File**
Create an `index.html` file in the project root with the following content:

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
      overflow: hidden;
    }
    header {
      font-size: 2.5rem;
      font-weight: bold;
      margin-bottom: 10px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    }
    p {
      font-size: 1.2rem;
      max-width: 600px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    button {
      background-color: #ffffff;
      color: #4caf50;
      font-size: 1rem;
      font-weight: bold;
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
      transition: transform 0.2s ease, background-color 0.3s ease;
    }
    button:hover {
      background-color: #f1f1f1;
      transform: scale(1.05);
    }
    footer {
      position: absolute;
      bottom: 10px;
      font-size: 0.9rem;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <header>Welcome to CashFlowApp</header>
  <p>Your personal finance manager for tracking expenses, managing budgets, and achieving financial goals.</p>
  <button onclick="startApp()">Get Started</button>
  <footer>&copy; 2025 CashFlowApp. All rights reserved.</footer>

  <script>
    function startApp() {
      alert('Launching CashFlowApp...');
    }
  </script>
</body>
</html>
```

#### 6. **Add an Application Icon**
1. Save your application logo as `icon.png` or `icon.ico`.
2. Place the icon in an appropriate directory, such as `assets/icons/`.
3. Update the `main.js` file to include the icon in the `BrowserWindow` configuration.

#### 7. **Run the Application**
Start the application using the following command:
```bash
npm start
```

---

### Troubleshooting
- **Error: Missing Script "start"**
  - Ensure the `start` script is defined in `package.json`.
  - Run `npm run` to see available scripts.

- **Error: `mainWindow.loadFile` is not a function**
  - Use `mainWindow.loadURL` instead with a `file://` path to load the HTML file.

---

### Phase 1 Deliverables
1. Basic Electron application setup.
2. A visually appealing `index.html` page.
3. Custom application icon integrated into Electron.

---



