import { HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { S3Client } from "../lib/s3"

const { R2_BUCKET_NAME } = process.env

const StorageService = () => {
    return {
        saveFile: async (fileName: string, fileBuffer: Buffer): Promise<boolean> => {
            const { $metadata } = await S3Client.send(new PutObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: fileName,
                ACL: "public-read",
                Body: fileBuffer
            }))
            if ($metadata.httpStatusCode == 200) return true
            return false
        },
        fileExits: async (fileName: string): Promise<boolean> => {
            try {
                await S3Client.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: fileName }))
                return true
            } catch (error) {
                return false
            }
        }
    }
}

export default StorageService()