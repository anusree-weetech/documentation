const express = require('express');
const WebSocket = require('ws');

const app = express();
const port = 3000;

// Set up the WebSocket server
const wss = new WebSocket.Server({ noServer: true });

wss.on('connection', (ws) => {
    console.log('A new WebSocket connection has been established.');
    
    ws.on('message', (message) => {
        console.log(`Received message: ${message}`);
        ws.send('Hello from WebSocket server!');
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed.');
    });
});

// Upgrade HTTP request to WebSocket
app.server = app.listen(port, () => {
    console.log(`Express server running on port ${port}`);
});

app.server.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
    });
});

app.get('/', (req, res) => {
    res.send('WebSocket server is running.');
});
