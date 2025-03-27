const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  console.log("user connected with id: ", socket.id);

  //   Listening for events
  socket.on("message", (data) => {
    console.log("Received:", data);
    //   Emitting events
    socket.emit("message", "Hello, client!");
  });

  //   Sending data with events
  socket.emit("userData", { username: "John", age: 25 });

  //   Custom event names vs. built-in events
  socket.on("customEvent", (data) => {
    console.log("Custom event received:", data);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected with id: ", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Reconnection error:", err);
  });
});

server.listen(port, () => console.log("server is listening on port:", port));
