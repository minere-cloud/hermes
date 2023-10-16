import axios from "axios"

const { PAPER_API_URL } = process.env

export const PaperScraper = async (version: string): Promise<string> => {
    console.log(`Scraping version ${version}`)
    const buildsFetch = await axios.get(`${PAPER_API_URL}/projects/paper/versions/${version}/builds`)
    const buildsResult = buildsFetch.data
    const buildId = buildsResult.builds[buildsResult.builds.length - 1].build as number
    return `${PAPER_API_URL}/projects/paper/versions/${version}/builds/${buildId}/downloads/paper-${version}-${buildId}.jar`
}
