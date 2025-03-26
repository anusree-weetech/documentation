const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);

const users = [];

io.on("connection", (socket) => {
  console.log("user connected with id: ", socket.id);
  //   Broadcasting to all except the sender
  socket.broadcast.emit("notification", "A new user has joined!");
  users.push(socket.id);

  socket.on("message", () => {
    //   Broadcasting to all clients
    io.emit("announcement", "Server update available!");

    //   Broadcasting to a specific client
    console.log("message to user:", users[0], ' current user:', socket.id);
    socket.to(users[1]).emit("privateMessage", "Hello, friend!");
  });

  socket.on("disconnect", () => {
    console.log("client disconnected with id: ", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Reconnection error:", err);
  });
});

server.listen(port, () => console.log("server is listening on port:", port));
