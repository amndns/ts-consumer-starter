#
# Builder Stage
#
FROM node:15.13.0-alpine3.13 AS builder

WORKDIR /usr/src/app

COPY package.json ./
COPY tsconfig.json ./
COPY yarn.lock ./
COPY ./src ./src

RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn build-ts

#
# Production Stage
#
FROM node:15.13.0-alpine3.13 AS production

WORKDIR /app
ENV NODE_ENV=production

COPY package.json ./
COPY yarn.lock ./
RUN yarn install --frozen-lockfile --production

COPY --from=builder /usr/src/app/dist ./dist
