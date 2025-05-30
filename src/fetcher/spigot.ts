type SpigotFetch = {
  url: string
}

const { SPIGET_API_URL } = process.env

export const spigotFetcher = (sourceUrl: string): SpigotFetch => {
  // Parse URL
  const urlAsArray = sourceUrl.split("/")

  // Second uri param and first from .
  // Resource name and id
  const resource = urlAsArray[4].split(".")
  const url = `${SPIGET_API_URL}/resources/${resource[1]}/download`

  return { url }
}