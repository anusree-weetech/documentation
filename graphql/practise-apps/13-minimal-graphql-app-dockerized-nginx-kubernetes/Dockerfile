FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "node", "index.js" ]

# making of docker image with name and tag
# running kube yaml with images defined
    # kube config made with images defined
# images being pulled from docker