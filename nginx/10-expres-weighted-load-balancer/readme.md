🔹 4. Weighted Load Balancing
👉 Some servers get more traffic based on their capacity.
✅ Best for: Mixed server capacities (e.g., one powerful server, two weaker ones).

Example: Weighted Load Balancing
```
upstream backend_servers2{
    server localhost:3000 weight=1;
    server localhost:3001 weight=3;
}

server{
    listen 8010;
    server_name localhost;

    location /{
        proxy_pass http://backend_servers2;
    }
}
```
How It Works:

server1 gets 3x more requests than server2.
Example request pattern: server1 → server1 → server1 → server2 (Repeats).

### Result

```
root@anusree:/etc/nginx# curl http://localhost:8010
hello from express port : 3001

root@anusree:/etc/nginx# curl http://localhost:8010
hello from express port : 3000

root@anusree:/etc/nginx# curl http://localhost:8010
hello from express port : 3001

root@anusree:/etc/nginx# curl http://localhost:8010
hello from express port : 3001

root@anusree:/etc/nginx# curl http://localhost:8010
hello from express port : 3001

root@anusree:/etc/nginx# curl http://localhost:8010
hello from express port : 3000

root@anusree:/etc/nginx# curl http://localhost:8010
hello from express port : 3001

root@anusree:/etc/nginx# curl http://localhost:8010
hello from express port : 3001

root@anusree:/etc/nginx# curl http://localhost:8010
hello from express port : 3001

root@anusree:/etc
```

- Port 3001 → 8 times

- Port 3000 → 3 times
- requests were routed to port 3001 about 2.67 times more often than port 3000.
