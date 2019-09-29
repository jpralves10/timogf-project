FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm i
RUN npm i -g pm2

COPY . .

EXPOSE 3003

CMD ["npm", "run", "prod-runtime"]