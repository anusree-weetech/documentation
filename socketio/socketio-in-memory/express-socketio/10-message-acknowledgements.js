const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const port = 3000;
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
    console.log("✅ User connected with ID:", socket.id);

    // ✅ Handling incoming messages with acknowledgment
    // switch on ack in postman
    socket.on("message", (data, callback) => {
        console.log("📩 Received message:", data);
        console.log('callback:', callback)

        // Simulate processing & acknowledge receipt
        if (data.text) {
            callback({ status: "ok" });
        } else {
            callback({ status: "error", message: "Invalid message" });
        }
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
    });

    socket.on("connect_error", (err) => {
        console.error("Connection error:", err.message);
    });
});

server.listen(port, () => console.log("Server is listening on port:", port));
