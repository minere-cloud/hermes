import axios from "axios"
import { Build, FetchResult } from "./typings.js"

const { PUFFERFISH_API_URL } = process.env

export const pufferfishFetcher = async (version: string): Promise<FetchResult> => {
    const builds: Build[] = []
    const pufferfishFetch = await axios.get(`${PUFFERFISH_API_URL}/job/Pufferfish-${version}/api/json?tree=builds[number,status,timestamp,id,result,changeSet[items[comment,commitId]],artifacts[*]]`)
    const pufferfishResult = pufferfishFetch.data
    for (const pufferfish of pufferfishResult.builds) {
        const build = pufferfish.number
        const url = `${PUFFERFISH_API_URL}/job/Pufferfish-${version}/${build}/artifact/build/libs/${pufferfish.artifacts[0].fileName}`
        builds.push({id: build,url})
    }
    return { builds }
}

