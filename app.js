const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    <html>
      <head><title>Node.js Docker App</title></head>
      <body style="font-family: Arial, sans-serif; text-align: center; margin-top: 50px;">
        <h1>🚀 Node.js App Running in Docker!</h1>
        <p>Hostname: <b>${os.hostname()}</b></p>
        <p>Server time: <b>${new Date().toLocaleString()}</b></p>
        <p>Try the health check: <a href="/health">/health</a></p>
      </body>
    </html>
  `);
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

app.get('/api/info', (req, res) => {
  res.json({
    app: 'nodejs-docker-app',
    version: '1.0.0',
    node_version: process.version,
    platform: process.platform
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
