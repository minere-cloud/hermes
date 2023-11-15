import { Context } from "hono"
import DownloadService from "./download.service.js"

const DownloadController = () => {
    return {
        gePlugin: async (c: Context) => {
            const url = c.req.query('url') ?? ""
            if (url.startsWith("https://www.spigotmc.org")) {
                return c.redirect(DownloadService.generateUrlSpigot(url))
            }
            if (url.startsWith("https://modrinth.com")) {
                return c.redirect(await DownloadService.generateUrlModrinth(url), 301)
            }
            return c.json("Not resource found", 404)
        },
        getServerJar: async (c: Context) => {
            const { type, version } = c.req.param()
            return c.redirect(await DownloadService.generateUrlServerJar(type, version))
        },
        getServerTemlate: async (c: Context) => {
            const { type } = c.req.param()
            return c.redirect(await DownloadService.generateUrlServerTemplate(type))
        },
        getServerJarsBuilds:async (c: Context) => {
          return c.json(await DownloadService.getAllServerJarsBuilds())
        }
    }
}

export default DownloadController()