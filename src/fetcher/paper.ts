import axios from "axios"
import { Build, FetchResult } from "./typings.js"

const { PAPER_API_URL } = process.env

export const paperFetcher = async (version: string): Promise<FetchResult> => {
  console.log(`Scraping version ${version}`)
  const builds: Build[] = []
  const paperFetch = await axios.get(`${PAPER_API_URL}/projects/paper/versions/${version}/builds`)
  const paperResult = paperFetch.data
  for (const paper of paperResult.builds) {
    const build = paper.build
    const url = `${PAPER_API_URL}/projects/paper/versions/${version}/builds/${build}/downloads/paper-${version}-${build}.jar`
    builds.push({ id: build, url })
  }

  return { builds: builds }
}
