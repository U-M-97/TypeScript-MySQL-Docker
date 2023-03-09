FROM node:18.14.2

COPY package.json /frontend/
COPY . . /frontend/
 
WORKDIR /frontend

RUN npm install

RUN npm run build

CMD [ "npm", "start" ]