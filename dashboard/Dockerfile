FROM node:20.18.0-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# EXPOSE ${DASHBOARD_PORT}
