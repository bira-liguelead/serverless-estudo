FROM node:20-alpine

RUN npm install -g serverless

WORKDIR /app

COPY package*.json ./

RUN npm install

CMD ["serverless", "offline", "--host", "0.0.0.0"]