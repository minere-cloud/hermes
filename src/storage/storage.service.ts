import { GetObjectCommand, HeadObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { S3Client } from "../lib/s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const StorageService = () => {
    return {
        saveFile: async (fileName: string, fileBuffer: Buffer, bucket: string): Promise<boolean> => {
            const { $metadata } = await S3Client.send(new PutObjectCommand({
                Bucket: bucket,
                Key: fileName,
                ACL: "public-read",
                Body: fileBuffer
            }))
            if ($metadata.httpStatusCode == 200) return true
            return false
        },
        fileExits: async (fileName: string, bucket: string): Promise<boolean> => {
            try {
                await S3Client.send(new HeadObjectCommand({ Bucket: bucket, Key: fileName }))
                return true
            } catch (error) {
                return false
            }
        },
        getSignedUrl: async (fileName: string, bucket: string): Promise<string> => {
            return await getSignedUrl(S3Client, new GetObjectCommand({
                Bucket: bucket,
                Key: fileName
            }), { expiresIn: 60 })
        }
    }
}


export default StorageService()