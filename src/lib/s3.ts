import { S3 } from "@aws-sdk/client-s3"

const { S3_ENDPOINT, S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY } = process.env

export const S3Client = new S3({
    endpoint: S3_ENDPOINT,
    region: S3_REGION,
    credentials: { accessKeyId: S3_ACCESS_KEY ?? "", secretAccessKey: S3_SECRET_KEY ?? "" },
    forcePathStyle: true
})