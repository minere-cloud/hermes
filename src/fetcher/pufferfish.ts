import axios from "axios"
import { FetchResult } from "./fetchResult.js"

const { PUFFERFISH_API_URL } = process.env

export const pufferfishFetcher = async (version: string): Promise<FetchResult> => {
    const buildsFetch = await axios.get(`${PUFFERFISH_API_URL}/job/Pufferfish-${version}/api/json?tree=builds[number,status,timestamp,id,result,changeSet[items[comment,commitId]],artifacts[*]]`)
    const buildsResult = buildsFetch.data
    const lastBuild = buildsResult.builds[0]
    const build = lastBuild.number as number
    const fileName = lastBuild.artifacts[0].fileName
    const url = `${PUFFERFISH_API_URL}/job/Pufferfish-${version}/${build}/artifact/build/libs/${fileName}`
    return { build, url }
}

