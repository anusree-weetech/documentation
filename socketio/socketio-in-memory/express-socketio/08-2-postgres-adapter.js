const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");

const { createAdapter } = require("@socket.io/postgres-adapter");
const pg = require("pg");

const port = process.argv[2] || 3000;
const server = http.createServer(app);
const io = socketio(server);

const pool = new pg.Pool({
  host: "localhost",
  user: "postgres",
  password: "yourpassword",
  database: "socketDB",
  port: 5432,
});

pool.query(`
  CREATE TABLE IF NOT EXISTS socket_io_attachments (
      id          bigserial UNIQUE,
      created_at  timestamptz DEFAULT NOW(),
      payload     bytea
  );
`);

pool.on("error", (err) => {
  console.error("Postgres error", err);
});

io.adapter(createAdapter(pool));

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
