require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");

const app = express();

// --- Middleware ---
app.use(helmet()); // Security headers
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json()); // Parse JSON bodies
app.use(morgan("combined")); // HTTP logging

// --- Rate Limiter ---
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 min
    max: 100, // limit each IP to 100 requests per window
    standardHeaders: true,
    legacyHeaders: false,
});
app.use("/metrics", apiLimiter);

// --- Health Check ---
app.get("/health", (req, res) => {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString() });
}); // For monitoring/alerts

// --- Config ---
const PORT = process.env.PORT || 4000;
const INTERVAL = parseInt(process.env.METRICS_INTERVAL_MS || 2000, 10) || 2000;

// --- Mock Data Generator ---
function generateData() {
    return {
        timestamp: new Date().toISOString(),
        active_users: Math.floor(Math.random() * 200),
        page_views: Math.floor(Math.random() * 500),
        avg_session_duration: +(Math.random() * 10).toFixed(1),
    };
}

// --- REST Endpoint (Polling) ---
app.get("/metrics", (req, res) => {
    res.json(generateData());
});

// --- WebSocket Streaming ---
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: process.env.CORS_ORIGIN || "*" },
});

io.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);

    // Send initial data point
    socket.emit("metrics", generateData());

    // Stream at interval
    const intervalId = setInterval(() => {
        socket.emit("metrics", generateData());
    }, INTERVAL);

    socket.on("disconnect", () => {
        clearInterval(intervalId);
        console.info(`Client disconnected [id=${socket.id}]`);
    });
});

// --- Error Handler ---
app.use((err, req, res, next) => {
    console.error("Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
});

// --- Graceful Shutdown ---
function shutdown() {
    console.log("Shutting down server...");
    server.close(() => {
        console.log("HTTP server closed.");
        process.exit(0);
    });
    // Force exit after 10s
    setTimeout(() => process.exit(1), 10000);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

// --- Start Server ---
server.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
});
