const { contextBridge } = require('electron');
const https = require('https');
const http = require('http');

// Define the backend URL (NestJS server)
const BACKEND_URL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:3000' // NestJS dev server
  : 'http://localhost:8080'; // Replace with production backend URL

// Utility function to send HTTP/HTTPS requests
function sendRequest(method, endpoint, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BACKEND_URL}/${endpoint}`);
    const options = {
      method: method,
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const client = url.protocol === 'https:' ? https : http;

    const req = client.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body));
        } else {
          reject(new Error(`Request failed with status ${res.statusCode}: ${body}`));
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Expose APIs to the renderer process
contextBridge.exposeInMainWorld('api', {
  login: async (email, password) => {
    return sendRequest('POST', 'users/login', { email, password });
  },
  register: async (userData) => {
    return sendRequest('POST', 'users/register', userData);
  },
});
