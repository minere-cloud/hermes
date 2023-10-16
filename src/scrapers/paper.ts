import axios from "axios"

const { PAPER_API } = process.env

export const PaperScraper = async (version: string): Promise<Buffer> => {
    console.log(`Scraping version ${version}`)
    const buildsFetch = await axios.get(`${PAPER_API}/projects/paper/versions/${version}/builds`)
    const buildsResult = buildsFetch.data
    const buildId = buildsResult.builds[buildsResult.builds.length - 1].build as number
    const downloadUrl = `${PAPER_API}/projects/paper/versions/${version}/builds/${buildId}/downloads/paper-${version}-${buildId}.jar`
    const fetchJar = await axios.get(downloadUrl, {
        responseType: "arraybuffer"
    })
    return fetchJar.data as Buffer
}
