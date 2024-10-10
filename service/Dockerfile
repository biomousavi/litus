FROM node:20.18.0-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${SERVICE_PORT}

FROM node:20.18.0-alpine AS production
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . . 
RUN npm run build
EXPOSE ${SERVICE_PORT}