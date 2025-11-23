# Base stage
FROM node:22 AS base

# Dependencies stage
FROM base AS dependencies

WORKDIR /usr/src/app

COPY frontend/package.json frontend/package-lock.json ./

RUN npm install

# Build stage
FROM dependencies AS build

WORKDIR /usr/src/app

#ARG VITE_API_BASE_URL
#ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

COPY .env ./

COPY frontend/. .

RUN npm run build

# Deploy stage
FROM base AS deploy

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json

EXPOSE 4173

CMD ["npm", "run", "preview", "--", "--host"]
