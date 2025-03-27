const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const Redis = require("ioredis");
const redisAdapter = require("@socket.io/redis-adapter");

const pubClient = new Redis("redis://localhost:6379");
const subClient = pubClient.duplicate();

const port = process.argv[2] || 3000;
const server = http.createServer(app);
const io = socketio(server);

io.adapter(redisAdapter.createAdapter(pubClient, subClient));

io.on("connection", (socket) => {
  console.log("user connected with id: ", socket.id);

  socket.on('message', ()=>{
    io.emit('message', 'braodcasted message')
  })

  socket.on("disconnect", () => {
    console.log("client disconnected with id: ", socket.id);
  });
});

server.listen(port, () => console.log("server is listening on port:", port));
