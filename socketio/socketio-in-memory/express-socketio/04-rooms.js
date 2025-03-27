const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);

const users = [];


// no feature for rooms in postman yet
io.on("connection", (socket) => {
  console.log("user connected with id: ", socket.id);

  socket.on("enter", () => {
    //   Joining a Room
    socket.join("room1");
    console.log(`${socket.id} joined room1`);

    // Emitting Messages to a Room
    io.to("room1").emit("roomMessage", "Hello, Room 1!");

    //  Getting the List of Clients in a Room
    io.sockets.adapter.rooms.get("room1"); // Returns Set of socket IDs in "room1"
  });

  socket.on("leave", () => {
    // Leaving a Room
    socket.leave("room1");
    console.log(`${socket.id} left room1`);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected with id: ", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Reconnection error:", err);
  });
});

server.listen(port, () => console.log("server is listening on port:", port));
