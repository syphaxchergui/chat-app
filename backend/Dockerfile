FROM node:16

# Create app directory
WORKDIR /usr/src/app/backend

# Install app dependencies
COPY package*.json ./

RUN npm install

# Bundle app source
COPY . .

EXPOSE 5000

CMD [ "node", "server.js" ]