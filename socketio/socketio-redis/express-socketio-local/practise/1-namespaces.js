const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const socketIo = require("socket.io");
const io = socketIo(server);

const chatNamespace = io.of("/chat");
const newsNamespace = io.of("/news");

chatNamespace.on("connection", (socket) => {
  console.log("connected to /chat namespace");

  socket.on("message", (data) => {
    console.log("recieved message in /chat ", data);
    socket.emit('response', `message recieved: ${data}`)
  });
});

newsNamespace.on('connection', socket=>{
    console.log('connected to /news namespace')
    socket.on('update')
})
