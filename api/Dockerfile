
ARG PORT=3001

FROM node:20-alpine AS builder
ENV NODE_ENV=${NODE_ENV:-production}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

ARG PORT

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE ${PORT}
CMD [ "node", "dist/src/main.js" ]