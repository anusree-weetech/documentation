const express = require("express");
const socketio = require("socket.io");
const Redis = require("ioredis");
const redisAdapter = require("@socket.io/redis-adapter"); //socket.io-redis deprecated
const http = require("http");

const app = express();
const server = http.createServer(app);

const serverPort = process.argv[2] || 3000;
const redisPort = process.env.REDIS_PORT || 6379;

const io = socketio(server);
const pubClient = new Redis(`redis://localhost:${redisPort}`);
const subClient = pubClient.duplicate();

io.adapter(redisAdapter.createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("chatMessage", (msg) => {
    console.log(`Received message: ${msg}`);

    io.emit("chatMessage", `reply for message: ${msg}`);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(serverPort, () => {
  console.log("server is listening on port", serverPort);
});
