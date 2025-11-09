# Base stage
FROM node:22 AS base

# Dependencies stage
FROM base AS dependencies

WORKDIR /usr/src/app

COPY backend/package.json backend/package-lock.json ./

RUN npm install

# Build stage
FROM dependencies AS build

WORKDIR /usr/src/app

COPY backend/. .

RUN npm run build

# Deploy stage
FROM base AS deploy

WORKDIR /usr/src/app

RUN npm install -g prisma

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma

RUN npx prisma generate

EXPOSE ${BACKEND_PORT:-3000}

CMD ["npm", "start"]
