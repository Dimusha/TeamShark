FROM node:16-stretch

WORKDIR /app/Orders

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4001

CMD ["node", "orders_controller.js"]