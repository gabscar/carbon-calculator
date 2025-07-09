FROM node:20-alpine AS builder

ARG VITE_API_URL
ARG VITE_API_AUTHORIZATION_KEY

ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_AUTHORIZATION_KEY=${VITE_API_AUTHORIZATION_KEY}

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80