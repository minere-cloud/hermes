import axios from "axios"

type ModrinthSearchResultHit = {
  project_id: string
  url: string
}

type ModrinthSearchResult = {
  hits: ModrinthSearchResultHit[]
}

type ModrinthProjectVersionFile = {
  url: string
  filename: string
}

type ModrinthProjectVersion = {
  files: ModrinthProjectVersionFile[]
}

type ModrinthProjectVersionResult = ModrinthProjectVersion[]

type ModrinthFetchResult = {
  url: string
}

const { MODRINTH_API_URL } = process.env

export const modrinthFetcher = async (sourceuUrl: string): Promise<ModrinthFetchResult> => {
  // Parse URL
  const urlAsArray = sourceuUrl.split("/")
  const resourceName = urlAsArray[urlAsArray.length - 1]

  // Project ID
  const searchFetch = await axios.get(`${MODRINTH_API_URL}/search?query=${resourceName}`)
  const searchResult = await searchFetch.data as ModrinthSearchResult
  const resourceId = searchResult.hits[0].project_id

  const projectVersionFetch = await axios.get(`${MODRINTH_API_URL}/project/${resourceId}/version`)
  const projectVersionResult = await projectVersionFetch.data as ModrinthProjectVersionResult
  const url = projectVersionResult[0].files[0].url
  return { url }
}