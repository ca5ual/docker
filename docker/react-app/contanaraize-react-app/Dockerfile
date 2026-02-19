FROM node:22-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm ci --force

COPY . .

RUN npm run build

FROM ngix:1.27.0

COPY --from=build /app/build /user/share/nginx/html
