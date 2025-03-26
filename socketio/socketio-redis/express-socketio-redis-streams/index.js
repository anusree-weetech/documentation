const express = require("express");
const socketio = require("socket.io");
const Redis = require("ioredis");
const http = require("http");

const app = express();
const server = http.createServer(app);

const serverPort = process.argv[2] || 3000;
const redisPort = process.env.REDIS_PORT || 6379;

const io = socketio(server);
const pubClient = new Redis(`redis://localhost:${redisPort}`);
const subClient = new Redis(`redis://localhost:${redisPort}`);

const STREAM_KEY = "socketio_stream";

// Create the stream if it doesn't exist
async function createStreamGroup() {
  try {
    // Attempt to create the stream group
    await pubClient.xgroup("CREATE", STREAM_KEY, "socket_group", "$", "MKSTREAM");
  } catch (err) {
    console.log(err.message.includes('BUSYGROUP'))
    if (err.message.includes("BUSYGROUP")) {
      console.log("Consumer group 'socket_group' already exists. Skipping creation.");
    } else {
      console.error("Error creating stream group:", err);
    }
  }
}

createStreamGroup();

// Publisher side: Emit events to the stream
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on("chatMessage", (msg) => {
    console.log(`Received message: ${msg}`);
    
    // Publish to Redis Stream (send to the stream)
    pubClient.xadd(STREAM_KEY, "*", "message", msg);
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

// Consumer side: Listen for stream messages and broadcast to all connected clients
async function consumeStream() {
  while (true) {
    // Read the stream, blocking until a new message arrives
    const result = await subClient.xread("BLOCK", 0, "STREAMS", STREAM_KEY, "$");

    // Process the message and emit it to all connected clients
    result.forEach((stream) => {
      stream[1].forEach((message) => {
        const msg = message[1][1]; // Extract the message (the second value)
        io.emit("chatMessage", `reply for message: ${msg}`);
      });
    });
  }
}

consumeStream();

server.listen(serverPort, () => {
  console.log("Server is listening on port", serverPort);
});
