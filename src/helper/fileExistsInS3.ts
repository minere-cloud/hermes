import { HeadObjectCommand } from "@aws-sdk/client-s3";
import { S3Client } from "../lib/s3";

const { R2_BUCKET_NAME } = process.env

export const fileExitsInS3 = async (fileName: string) => {
    try {
        await S3Client.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: fileName }))
        return true
    } catch (error) {
        return false
    }
}