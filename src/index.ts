import { Hono } from 'hono'
import { DownloadRouter } from './download/routes';

const app = new Hono().basePath("/v1")

app.route("/download", DownloadRouter)

export default {
    port: 3000,
    hostname: "0.0.0.0",
    fetch: app.fetch
}
