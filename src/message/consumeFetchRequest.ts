import database from "../lib/database.js";
import { EachMessagePayload } from "kafkajs";
import { fetchFileBuffer } from "../helper/fetchFileBuffer.js";
import StorageService from "../storage/storage.service.js";

type FetchJarRequest = {
  version: string
  build: number
  url: string
}

const { R2_SERVER_JAR_BUCKET_NAME } = process.env

export const consumeFetchRequest = async (type: string, payload: EachMessagePayload) => {
  try {
    const { build, url, version } = parsePayload(payload)

    const serverJar = await database.serverJar.findFirst(
      {
        where: {
          version: version,
          build: build.toString()
        }
      })
    if (serverJar) return

    await database.serverJar.delete({ where: { build: build.toString() } })
    const buffer = await fetchFileBuffer(url)
    await StorageService.saveFile(`${type}/${version}/server.jar`, buffer, R2_SERVER_JAR_BUCKET_NAME ?? "")
    await database.serverJar.create({ data: { type, build: build.toString(), version: version, url: url } })
  } catch (e) {
    console.log(e)
  }
}

const parsePayload = (payload: EachMessagePayload): FetchJarRequest => {
  return JSON.parse(payload.message.value?.toString() ?? "") as FetchJarRequest
}

