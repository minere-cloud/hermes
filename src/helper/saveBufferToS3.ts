import { PutObjectCommand } from "@aws-sdk/client-s3"
import { S3Client } from "../lib/s3"

const { R2_BUCKET_NAME } = process.env

export const saveBufferToS3 = (fileName: string, buffer: Buffer) => {
    return S3Client.send(new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: fileName,
        ACL: "public-read",
        Body: buffer
    }))
}