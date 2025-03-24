const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const port = process.argv[2] || 3000

//setup socketio
const server = http.createServer(app);
const io = socketIo(server);


//routes
app.get('/', (req, res) => {
  res.send('Hello, Socket.IO!');
});

//listen to socket io
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(port, () => {
  console.log('Server is running on port ', port);
});
