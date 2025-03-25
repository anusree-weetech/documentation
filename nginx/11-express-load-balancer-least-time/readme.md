### 🔹 5. Least Time (Response Time-Based)
- 👉 Requests go to the server with the fastest response time.
- ✅ Best for: Applications where response time varies significantly.

Example: Least Time in Nginx

```
upstream backend_servers3{
    least_time header; #least_time is only available in NGINX Plus, the commercial version of Nginx.
    server localhost:3000;
    server localhost:3001;
}

server{
    listen 8011;
    server_name localhost;

    location /{
        proxy_pass http://backend_servers3;
    }
}
```

#### How It Works:

- Nginx measures how fast each server responds.
- The next request goes to the server with the shortest response time.
