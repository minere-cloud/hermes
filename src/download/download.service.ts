import { GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client } from "../lib/s3"
import axios from "axios"

const { MODRINTH_API_URL, SPIGET_API_URL, R2_BUCKET_NAME } = process.env

const DownloadService = () => {
    return {
        generateUrlSpigot: (url: string): string => {
            // Parse URL
            const urlAsArray = url.split("/")
            
            // Second uri param and first from .
            // Resource name and id
            const resource = urlAsArray[4].split(".")
            return `${SPIGET_API_URL}/resources/${resource[1]}/download`
        },
        generateUrlModrinth: async (url: string): Promise<string> => {
            // Parse URL
            const urlAsArray = url.split("/")
            const resourceName = urlAsArray[urlAsArray.length - 1]

            // Project ID
            const searchFetch = await axios.get(`${MODRINTH_API_URL}/search?query=${resourceName}`)
            const searchResult = await searchFetch.data as any
            const resourceId = searchResult.hits[0].project_id

            // Download URL
            const projectVersionFetch = await fetch(`${MODRINTH_API_URL}/project/${resourceId}/version`)
            const projectVersionResult = await projectVersionFetch.json() as any

            return projectVersionResult[0].files[0].url
        },
        generateUrlServerJar: async (type: string, version: string) => {
            return await getSignedUrl(S3Client, new GetObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: `${type}/${version}/server.jar`
            }), { expiresIn: 60 })
        }
    }
}

export default DownloadService()