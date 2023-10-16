import axios from "axios"

const { PUFFERFISH_API_URL } = process.env

export const PufferfishScraper = async (version: string): Promise<string> => {
    const buildsFetch = await axios.get(`${PUFFERFISH_API_URL}/job/Pufferfish-${version}/api/json?tree=builds[number,status,timestamp,id,result,changeSet[items[comment,commitId]],artifacts[*]]`)
    const buildsResult = buildsFetch.data
    const lastBuild = buildsResult.builds[0]
    const buildNumber = lastBuild.number
    const fileName = lastBuild.artifacts[0].fileName
    return `${PUFFERFISH_API_URL}/job/Pufferfish-${version}/${buildNumber}/artifact/build/libs/${fileName}`
}

