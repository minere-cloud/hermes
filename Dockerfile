FROM oven/bun:1-debian

COPY package.json bun.lockb src /app/

WORKDIR /app

RUN bun install

ENTRYPOINT bun run /app/index.ts