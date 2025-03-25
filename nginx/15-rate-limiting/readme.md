limit_req_zone $binary_remote_addr zone=limit_zone:10m rate=1r/s;

    server {
        listen 8015;
        server_name lcoalhost;

        location / {
            limit_req zone=limit_zone burst=20 nodelay;
            proxy_pass http://localhost:3000;
        }
    }

### Response

```

    root@anusree:/etc/nginx# curl http://localhost:8015

Hello from Express port: 3000root@anusree:/etc/nginx#
root@anusree:/etc/nginx# curl http://localhost:8015
Hello from Express port: 3000root@anusree:/etc/nginx# curl http://localhost:8015

<html>
<head><title>503 Service Temporarily Unavailable</title></head>
<body>
<center><h1>503 Service Temporarily Unavailable</h1></center>
<hr><center>nginx/1.18.0 (Ubuntu)</center>
</body>
</html>
```

- to avopid ddos attack: Distributed Denial-of-Service (DDoS) attack is a cyberattack where multiple compromised systems (a botnet) flood a target with traffic, aiming to make it unavailable to legitimate user

- This NGINX configuration defines **rate limiting** for HTTP requests. Here's a detailed explanation of each part of the configuration:

### 1. **`limit_req_zone` directive:**

```nginx
limit_req_zone $binary_remote_addr zone=limit_zone:10m rate=1r/s;
```

- **`$binary_remote_addr`**: This variable represents the **IP address** of the client making the request, in a binary format. This is used to track the request rate per IP address.
- **`zone=limit_zone:10m`**:

  - **`limit_zone`** is the name of the shared memory zone used to store the state of rate limiting for each IP address.
  - **`10m`** specifies the size of the shared memory zone, which is 10 MB. This memory will store the rate-limiting data for all incoming client IPs.

- **`rate=1r/s`**: This sets the rate limit to **1 request per second** for each client (IP address). This means that each IP is allowed to make a maximum of 1 request per second.

### 2. **The `server` block:**

```nginx
server {
    listen 8015;
    server_name localhost;
```

- **`listen 8015;`**: NGINX listens for incoming requests on port **8015**.
- **`server_name localhost;`**: This sets the server name to `localhost`. In a production environment, this would usually be the domain or IP address you're serving.

### 3. **The `location /` block:**

```nginx
location / {
    limit_req zone=limit_zone burst=20 nodelay;
    proxy_pass http://localhost:3000;
}
```

- **`limit_req zone=limit_zone burst=20 nodelay;`**:

  - **`limit_req zone=limit_zone`**: This applies the **rate limit** defined in the `limit_req_zone` directive (from above). The zone `limit_zone` was created earlier to store the request counts for each IP address.
  - **`burst=20`**: This allows a **burst** of up to 20 requests, meaning a client can exceed the rate limit temporarily (up to 20 requests), but requests exceeding this burst limit will be delayed or rejected depending on the configuration.
  - **`nodelay`**: If the burst is exceeded, the request will not be delayed. Instead, the server will reject the request immediately (rate limiting takes effect instantly after the burst limit is exceeded). Without `nodelay`, requests could be delayed until the rate limit is back in the acceptable range.

- **`proxy_pass http://localhost:3000;`**: This forwards the requests to an upstream server running on `localhost:3000`. This is where NGINX will proxy the requests after they pass through the rate limit check.

### **Summary:**

- **Rate Limiting**: The `limit_req_zone` and `limit_req` directives together implement a **rate-limiting policy**.

  - The rate limit is **1 request per second** for each client IP address.
  - Clients can burst up to **20 requests** in a short time, but any requests above the burst limit will be rejected immediately (`nodelay`).

- **Proxying Requests**: After the rate limit check, valid requests are forwarded to a backend service running on `localhost:3000`.

### **Example Scenario:**

- A client makes 5 requests in 1 second. Since the rate limit is 1 request per second, the first request will be accepted, and the next 4 requests will be held until the burst capacity of 20 is reached.
- If the client exceeds the 20-burst limit, the server will **immediately reject** the next requests, as defined by the `nodelay` directive.
