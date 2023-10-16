import { S3 } from "@aws-sdk/client-s3"

const { R2_ACCOUNT_ID, R2_ACCESS_KEY, R2_SECRET_KEY } = process.env

export const S3Client = new S3({
    endpoint: `https://${R2_ACCOUNT_ID ?? "xxx"}.r2.cloudflarestorage.com`,
    region: "us-east-1",
    credentials: { accessKeyId: R2_ACCESS_KEY ?? "", secretAccessKey: R2_SECRET_KEY ?? "" }
})