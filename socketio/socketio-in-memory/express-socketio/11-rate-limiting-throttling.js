const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const rateLimit = require("express-rate-limit");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);

// 1️⃣ **Rate Limiting for HTTP Requests (Before WebSockets)**
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per minute
  message: "Too many requests from this IP, please try again later.",
});

app.use("/socket.io/", limiter); // Apply rate limiting to socket.io requests

// 2️⃣ **Rate Limiting for WebSocket Connections**
const connectionAttempts = new Map(); // Store attempt counts per IP

io.use((socket, next) => {
  const ip = socket.handshake.address;
  const now = Date.now();

  if (!connectionAttempts.has(ip)) {
    connectionAttempts.set(ip, []);
  }

  const timestamps = connectionAttempts.get(ip);
  timestamps.push(now);

  // Keep only attempts within the last minute
  connectionAttempts.set(
    ip,
    timestamps.filter((time) => now - time < 60 * 1000)
  );

  if (timestamps.length > 10) {
    return next(new Error("Rate limit exceeded"));
  }

  next();
});

// 3️⃣ **IP Banning Mechanism**
const bannedIPs = new Set(["192.168.1.1"]); // Add malicious IPs here

io.use((socket, next) => {
  if (bannedIPs.has(socket.handshake.address)) {
    return next(new Error("You are banned!"));
  }
  next();
});

// 4️⃣ **Socket Connection Handling**
io.on("connection", (socket) => {
  console.log("✅ User connected with ID:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ Client disconnected:", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("⚠️ Connection error:", err.message);
  });
});

server.listen(port, () => console.log("🚀 Server is listening on port:", port));
