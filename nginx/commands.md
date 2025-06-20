### Some common nginx related commands

- when trying to code or add nginx files in `etc/nginx/` folder, then first open vscode and run `sudo code --no-sandbox --user-data-dir=/tmp/vscode-root .` in terminal. Then start coding. 

- for every command if not runing the terminal as the owner, prefix `sudo` to everything

- installing nginx `apt install nginx`
- staring nginx `systemctl start nginx `
- testing if nginx is working fine `nginx -t`
- process of adding files to nginx

  - add the code in a new file in sites-available (example: my-site)
  - run `ln -s sites-avaialable/my-site sites-enabled/my-sites` to createa symbolic link for 'my-site' in sites-enabled folder
  - restart nginx by running `systemctl restart nginx`
  - send a request to website url thats setup `curl http://web-url.com:port`

- command to create an ssl certificate:

```
sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
    -keyout /etc/ssl/private/nginx-selfsigned.key \
    -out /etc/ssl/certs/nginx-selfsigned.crt
```

Explanation of the Command:
openssl req -x509 → Generate a self-signed certificate

- nodes → No password (so NGINX can use it without manual input)

- days 365 → Certificate validity (1 year)

- newkey rsa:2048 → Creates a new 2048-bit RSA key

- keyout /etc/ssl/private/nginx-selfsigned.key → Stores the private key

- out /etc/ssl/certs/nginx-selfsigned.crt → Stores the certificate
