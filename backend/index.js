require('dotenv').config();

const express = require('express');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('tiny'));       // HTTP request logging

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

// Config
const PORT = process.env.PORT || 4000;
const INTERVAL = parseInt(process.env.METRICS_INTERVAL_MS, 10) || 2000;

// Mock data generator
function generateData() {
  return {
    timestamp: new Date().toISOString(),
    active_users: Math.floor(Math.random() * 200),
    page_views: Math.floor(Math.random() * 500),
    avg_session_duration: +(Math.random() * 10).toFixed(1),
  };
}

// REST endpoint (polling clients hit this)
app.get('/metrics', (req, res) => {
  res.json(generateData());
});

// WebSocket streaming
io.on('connection', socket => {
  console.log(`Client connected [id=${socket.id}]`);

  // Immediately send one data point on connect
  socket.emit('metrics', generateData());

  // Then at regular intervals
  const intervalId = setInterval(() => {
    socket.emit('metrics', generateData());
  }, INTERVAL);

  socket.on('disconnect', () => {
    clearInterval(intervalId);
    console.log(`Client disconnected [id=${socket.id}]`);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
