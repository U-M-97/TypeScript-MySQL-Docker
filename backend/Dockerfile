FROM node:18.14.2

COPY package.json /server/
COPY . . /server/
 
WORKDIR /server

RUN npm install

RUN npm run build

CMD [ "node", "server.js" ]