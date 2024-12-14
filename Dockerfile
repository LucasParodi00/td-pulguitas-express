# Usar la imagen base de node 22.12-alpine3.20
FROM node:22.12-alpine3.20

RUN npm install -g pnpm

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD [ "pnpm","start" ]

