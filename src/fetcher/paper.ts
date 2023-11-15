import axios from "axios"
import { FetchResult } from "./fetchResult.js"

const { PAPER_API_URL } = process.env

export const paperFetcher = async (version: string): Promise<FetchResult> => {
	console.log(`Scraping version ${version}`)
	const buildsFetch = await axios.get(`${PAPER_API_URL}/projects/paper/versions/${version}/builds`)
	const buildsResult = buildsFetch.data
	const build = buildsResult.builds[buildsResult.builds.length - 1].build as number
	const url = `${PAPER_API_URL}/projects/paper/versions/${version}/builds/${build}/downloads/paper-${version}-${build}.jar`
	return { build, url }
}
