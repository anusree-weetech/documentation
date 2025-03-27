const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const mongodb = require("mongodb");
const mongoAdapter = require("@socket.io/mongo-adapter");

const port = process.argv[2] || 3000;
const server = http.createServer(app);
const io = socketio(server);

const DB = "socketDB";
const COLLECTION = "socket.io-adapter";

const mongoClient = new mongodb.MongoClient(
  "mongodb://localhost:27017/?replicaSet=rs0&directConnection=true"
);

mongoClient.connect().then(async () => {
  const db = mongoClient.db(DB);

  // Get list of collections
  const collections = await db.listCollections({ name: COLLECTION }).toArray();

  // Check if collection exists
  if (collections.length === 0) {
    // Collection does not exist, create it
    db.createCollection(COLLECTION, {
      capped: true,
      size: 1e6,
    })
      .then(() => console.log("✅ Collection created"))
      .catch((err) => console.log("❌ Error creating collection:", err));
  } else {
    console.log("✅ Collection already exists");
  }
});

const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

io.adapter(mongoAdapter.createAdapter(mongoCollection));

io.on("connection", (socket) => {
  console.log("user connected with id: ", socket.id);

  socket.on("message", (data) => {
    io.emit("message", `braodcasted message: ${data}`);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected with id: ", socket.id);
  });
});

server.listen(port, () => console.log("server is listening on port:", port));
