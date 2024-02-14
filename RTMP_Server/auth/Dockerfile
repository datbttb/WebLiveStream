FROM node:12
WORKDIR /the/workdir/path
COPY package*.json ./
RUN npm install
COPY server.js ./
VOLUME ["/record", "/record-data"]
CMD [ "npm","start" ]