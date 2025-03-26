const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);

//establishing socket connection
io.on("connection", (socket) => {
  console.log("user connected with id: ", socket.id);

  //client disconnection
  socket.on("disconnect", () => {
    console.log("client disconnected with id: ", socket.id);
  });

  // Detecting reconnections
  socket.on("connect_error", (err) => {
    console.error("Reconnection error:", err); //dnt know hoe to reproduce the result yet
  });
});

server.listen(port, () => console.log("server is listening on port:", port));
