server {
listen 8014;
server_name localhost;

    # Regular HTTP traffic
    location / {
        proxy_pass http://localhost:3000;  # Your Express server address
        # proxy_set_header Host $host;
        # proxy_set_header X-Real-IP $remote_addr;
        # proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket connections handling
    location /ws/ {
        proxy_pass http://localhost:3000;  # Your Express server address
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        # proxy_set_header Host $host;
        # proxy_cache_bypass $http_upgrade;
    }

}

2. Testing WebSockets with WebSocket Client (Recommended)
   To actually interact with WebSockets, you would use a WebSocket client, such as:

Option 1: Using Browser DevTools
Most modern browsers (e.g., Chrome, Firefox) allow you to test WebSocket connections directly in the browser.

Open your browser’s DevTools (F12 or right-click → Inspect).

Go to the "Console" tab.

Type the following JavaScript code to create a WebSocket connection:

javascript
Copy
Edit
const socket = new WebSocket('ws://yourdomain.com/ws/');

socket.onopen = () => {
console.log('WebSocket connection established');
socket.send('Hello from client!');
};

socket.onmessage = (event) => {
console.log('Message from server:', event.data);
};

socket.onclose = () => {
console.log('WebSocket connection closed');
};
