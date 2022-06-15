FROM node:16-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY next.config.js ./next.config.js

COPY src ./src
COPY styles ./styles
COPY public ./public

CMD ["npm", "run", "dev"]