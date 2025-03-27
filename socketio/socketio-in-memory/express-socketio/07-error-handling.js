const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("user connected with id: ", socket.id);

  socket.on("disconnect", () => {
    console.log("client disconnected with id: ", socket.id);
  });

  // Detecting reconnections
  socket.on("connect_error", (err) => {
    console.error("Reconnection error:", err); //dnt know hoe to reproduce the result yet
  });

  //   Handling Custom Errors
  socket.on("error", (err) => {
    console.error("Custom error received:", err);
  });
});

server.listen(port, () => console.log("server is listening on port:", port));

// Debugging WebSocket Failures via terminal: DEBUG=socket.io* node server.js