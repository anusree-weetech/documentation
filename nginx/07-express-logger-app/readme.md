log_format main '$remote_addr - $remote_user [$time_local] "$request" ' '$status $body_bytes_sent "$http_referer" ' '"$http_user_agent" "$http_x_forwarded_for"';
access_log /var/log/nginx/access.log main;
error_log /var/log/nginx/error.log warn;

server {
listen 8007;
server_name localhost;

    location / {
        proxy_pass http://localhost:3000;
        # proxy_set_header Host $host;
        # proxy_set_header X-Real-IP $remote_addr;
        # proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    }

}

- these commands do not "show" the logs directly in the terminal. They just configure where and how NGINX logs the requests and errors. The tail -f command is how you view them in real-time. `tail -f /var/log/nginx/access.log`
