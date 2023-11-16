import StorageService from "../storage/storage.service.js"
import database from "../lib/database.js"
import { modrinthFetcher } from "../fetcher/modrinth.js"
import { spigotFetcher } from "../fetcher/spigot.js"

const { SERVER_JAR_BUCKET_NAME, SERVER_TEMPLATE_BUCKET_NAME } = process.env

const DownloadService = () => {
  return {
    generateUrlSpigot: (sourceUrl: string): string => {
      const { url } = spigotFetcher(sourceUrl)
      return url
    },
    generateUrlModrinth: async (sourceuUrl: string): Promise<string> => {
      const { url } = await modrinthFetcher(sourceuUrl)
      return url
    },
    generateUrlServerJar: async (type: string, version: string) => {
      return await StorageService.getSignedUrl(`${type}/${version}/server.jar`, SERVER_JAR_BUCKET_NAME ?? "")
    },
    generateUrlServerTemplate: async (type: string) => {
      return await StorageService.getSignedUrl(`${type}.tar.gz`, SERVER_TEMPLATE_BUCKET_NAME ?? "")
    },
    getAllServerJarsBuilds: async () => {
      return await database.serverJar.findMany()
    }
  }
}

export default DownloadService()