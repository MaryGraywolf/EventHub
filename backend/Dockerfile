FROM node:20 AS base

FROM base AS dependencies

WORKDIR /usr/src/app

COPY backend/package.json backend/package-lock.json ./

RUN npm i

FROM dependencies AS build

WORKDIR /usr/src/app

COPY backend/. .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules

RUN npm run build
RUN npm prune --prod

FROM node:20-alpine3.19 AS deploy

WORKDIR /usr/src/app

RUN npm i -g prisma

COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/package.json ./package.json
COPY --from=build /usr/src/app/prisma ./prisma

RUN npx prisma generate

EXPOSE ${BACKEND_PORT:-3000}

CMD ["npm", "start"]
