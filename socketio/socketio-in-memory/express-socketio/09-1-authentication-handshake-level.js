const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);

io.use((socket, next) => {
  if (socket.handshake.auth.token === "valid_token" || socket.handshake.headers.token === "valid_token" ) {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

io.on("connection", (socket) => {
  console.log("user connected with id: ", socket.id);

  socket.on("disconnect", () => {
    console.log("client disconnected with id: ", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Reconnection error:", err); //dnt know hoe to reproduce the result yet
  });
});

server.listen(port, () => console.log("server is listening on port:", port));
