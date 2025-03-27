const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const jwt = require("jsonwebtoken");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);


io.use((socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) return next(new Error("Authentication required"));

    jwt.verify(token, "secret_key", (err, decoded) => {
        if (err) return next(new Error("Invalid token"));
        socket.user = decoded; // Attach user data
        next();
    });
});

io.on("connection", (socket) => {
  console.log("user connected with id: ", socket.id);

  socket.on("disconnect", () => {
    console.log("client disconnected with id: ", socket.id);
  });

  socket.on("connect_error", (err) => {
    console.error("Reconnection error:", err); //dnt know how to reproduce the result yet
  });
});

server.listen(port, () => console.log("server is listening on port:", port));
