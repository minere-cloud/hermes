FROM node:20.9-bullseye-slim AS BUILD

COPY . /build/

WORKDIR /build

RUN npm ci && npm run build

FROM node:20.9-bullseye-slim AS FINAL

RUN apt-get update && apt-get install ca-certificates

USER node

COPY --from=BUILD /build/package.json /build/package-lock.json /app/

COPY --from=BUILD /build/node_modules /app/node_modules

COPY --from=BUILD /build/dist /app/dist

WORKDIR /app

ENTRYPOINT node dist/index.js