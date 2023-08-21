ARG NODE_VERSION=20.5-alpine

FROM --platform=amd64 node:${NODE_VERSION} as base
WORKDIR /usr/src/app
COPY package*.json .

FROM base as builder
RUN npm ci
COPY . .
RUN npm run build

FROM --platform=amd64 node:${NODE_VERSION} as production
WORKDIR /usr/src/app
COPY --from=builder /usr/src/app/package*.json ./
RUN npm ci --production
COPY --from=builder /usr/src/app/dist ./dist
CMD ["npm", "run", "start"]
