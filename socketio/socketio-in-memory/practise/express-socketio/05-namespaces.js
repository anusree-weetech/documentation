const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);


// ✅ Creating a Namespace (OUTSIDE `io.on("connection")`)
const chatNamespace = io.of("/chat");

chatNamespace.on("connection", (socket) => {
  console.log("User connected to /chat namespace:", socket.id);

  // ✅ Isolating Events Within a Namespace
  socket.on("message", (msg) => {
    console.log(`Message in /chat: ${msg}`);
    chatNamespace.emit("chatMessage", msg); // Send message to all in /chat
  });
});

// ✅ Authentication at the Namespace Level (OUTSIDE `io.on("connection")`)
io.of("/secure").use((socket, next) => {
  //postman doesnt support this yet
  if (socket.handshake.auth.token === "valid_token") {
    next();
  } else if (socket.handshake.headers.token === "valid_token") {
    next();
  } else {
    next(new Error("Unauthorized"));
  }
});

// 👇 If next() is called successfully, this event runs
io.of("/secure").on("connection", (socket) => {
  console.log("User connected to /secure namespace:", socket.id);
});

// ✅ Normal Global Connection
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
});

server.listen(port, () => console.log("server is listening on port:", port));
