FROM node:12
WORKDIR /the/workdir/serverchat
COPY package*.json ./
RUN npm install
COPY index.js ./
CMD [ "npm","start" ]