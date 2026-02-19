FROM node:22-alpine AS development

WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . . 
CMD ["npm", "run", "dev"]

FROM node:22-alpine AS prod-deps

WORKDIR /app
COPY package*.json .
RUN npm ci --only=production

FROM gcr.io/distroless/nodejs22 AS prod

WORKDIR /app
COPY --from=prod-deps /app/node_modules node_modules
COPY src src 
CMD ["src/server.js"]

