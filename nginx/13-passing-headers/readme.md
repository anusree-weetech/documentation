1️⃣ Passing Headers in Nginx
By default, Nginx does not forward all request headers from the client to the backend server. To ensure proper functionality, important headers like Host, X-Real-IP, and X-Forwarded-For should be forwarded explicitly.

🔹 Example: Passing Headers to Backend
```
server {
    listen 8013;
    server_name localhost;

    location /api/ {
        proxy_pass http://localhost:3000;
        
        # Forward original client headers
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;

        # Allow WebSocket headers
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";

        # Ensure large headers are allowed
        proxy_buffer_size 128k;
        proxy_buffers 4 256k;
        proxy_busy_buffers_size 256k;
    }
}
```
🔹 Explanation of Headers:
proxy_set_header Host $host; → Passes the original Host header.

proxy_set_header X-Real-IP $remote_addr; → Sends the client’s real IP address.

proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; → Tracks the client’s original IP.

proxy_set_header X-Forwarded-Proto $scheme; → Indicates HTTP or HTTPS for backend routing.