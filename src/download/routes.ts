import { Hono } from "hono";
import { DownloadService } from "./download.service";

export const DownloadRouter = new Hono()


DownloadRouter.get('/plugin', async (c) => {
    const url = c.req.query('url') ?? ""
    if (url.startsWith("https://www.spigotmc.org")) {
        return c.redirect(DownloadService().generateUrlSpigot(url))
    }
    if (url.startsWith("https://modrinth.com")) {
        return c.redirect(await DownloadService().generateUrlModrinth(url), 301)
    }
    return c.json("Not resource found", 404)
})

DownloadRouter.get("/serverjar/:type/:version", async (c) => {
    const { type, version } = c.req.param()
    return c.redirect(await DownloadService().generateUrlServerJar(type, version))
})