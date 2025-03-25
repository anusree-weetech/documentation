🔹 6. Random Load Balancing
👉 Requests are sent to a random backend (can be weighted).
✅ Best for: Testing, simulations, and avoiding overload on specific servers.

Example: Random Load Balancing
upstream backend_servers {
    random two;
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
How It Works:

Picks two random servers and selects the one with fewer active connections.