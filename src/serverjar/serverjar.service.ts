import { Prisma, ServerJar } from "@prisma/client"
import database from "../lib/database.js"

const serverJarService = () => {
  return {
    create: async ({ type, url, version, build }: Prisma.ServerJarCreateInput): Promise<ServerJar> => {
      return await database.serverJar.create({ data: { type, build, version: version, url: url } })
    },
    buildExits: async ({ type, version, build }: Prisma.ServerJarWhereInput): Promise<boolean> => {
      try {
        await database.serverJar.findFirstOrThrow({ where: { type, build, version } })
        return true
      } catch {
        return false
      }
    }
  }
}


export default serverJarService()