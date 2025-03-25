const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const redisAdapter = require("socket.io-redis");
const redis = require("redis");

const app = express();
const server = http.createServer(app);

const io = socketIo(server);

const pubClient = redis.createClient({ host: "localhost", port: 6379 });
const subClient = redis.createClient({ host: "localhost", port: 6379 });

io.adapter(redisAdapter({ pubClient, subClient }));

app.get("/", (req, res) => {
  res.send("Socket.IO with Redis Chat Application");
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("chat message", (msg) => {
    console.log("Message received:", msg);
    io.emit("chat message", msg);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
    
  });
});

// Start the server
server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
