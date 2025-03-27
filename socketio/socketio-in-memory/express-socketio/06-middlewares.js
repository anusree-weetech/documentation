const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*", // Allow all origins
    methods: ["GET", "POST"], // Allowed HTTP methods
  },
});

// 🔹 Middleware (Intercept Before Connection)
io.use((socket, next) => {
  console.log(`New connection attempt: ${socket.id}`);

  // ✅ Validating User Authentication
  if (!socket.handshake.auth.token && !socket.handshake.headers.token ) {
    return next(new Error("Authentication required"));
  }

  // ✅ Modifying Socket Data Before Connection
  socket.userData = { username: "JohnDoe" };

  next(); // Allow connection
});

// 🔹 Handling Socket Connections
io.on("connection", (socket) => {
  console.log(
    `User connected: ${socket.id}, Username: ${socket.userData.username}`
  );

  socket.on("message", (msg) => {
    console.log(`Received message from ${socket.id}: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(port, () => console.log("server is listening on port:", port));
