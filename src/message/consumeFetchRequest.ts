import { EachMessagePayload } from "kafkajs";
import { fetchFileBuffer } from "../helper/fetchFileBuffer.js";
import StorageService from "../storage/storage.service.js";
import serverjarService from "../serverjar/serverjar.service.js";

type FetchJarRequest = {
  version: string
  build: string
  url: string
}

const { SERVER_JAR_BUCKET_NAME } = process.env

export const consumeFetchRequest = async (type: string, payload: EachMessagePayload) => {
  try {
    const { build, url, version } = parsePayload(payload)
    if (await serverjarService.buildExits({type, version, build })) return
    const buffer = await fetchFileBuffer(url)
    await StorageService.saveFile(`${type}/${version}/${build}/server.jar`, buffer, SERVER_JAR_BUCKET_NAME ?? "")
    await serverjarService.create({ type, build, url, version })
  } catch (e) {
    console.log(e)
  }
}

const parsePayload = (payload: EachMessagePayload): FetchJarRequest => {
  return JSON.parse(payload.message.value?.toString() ?? "") as FetchJarRequest
}

