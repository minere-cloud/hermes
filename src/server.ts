import { Hono } from 'hono'
import { DownloadRouter } from './download/routes.js';
import { serve } from '@hono/node-server';
import { logger } from './lib/logger.js';
import database from './lib/database.js';


export const initServer = () => {
  const app = new Hono().basePath("/v1")

  app.route("/download", DownloadRouter)

  const server = serve({ fetch: app.fetch, hostname: "0.0.0.0", port: 3000 }, (info) => {
    logger.info(`Server is listening on http://${info.address}:${info.port}`)
  })

  server.once('listening', () => {
    database.$connect()
  })
} 