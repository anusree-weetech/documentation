🔹 3. IP Hash (Sticky Sessions)
👉 Requests from the same client always go to the same server.
✅ Best for: Applications needing session persistence (e.g., login-based apps).
❌ Not ideal for: Stateless apps (APIs, microservices).

Example: IP Hash in Nginx
```
upstream backend_servers {
    ip_hash;
    server server1.example.com;
    server server2.example.com;
}

server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://backend_servers;
    }
}
```
How It Works:

Client A (IP: 192.168.1.1) → server1
Client B (IP: 192.168.1.2) → server2
Future requests from Client A will always go to server1.