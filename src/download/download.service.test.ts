import { describe, test } from 'node:test'
import assert from "node:assert/strict"
import { unlinkSync, existsSync, writeFileSync, statSync } from "fs"
import DownloadService from "./download.service.js"
import { fetchFileBuffer } from '../helper/fetchFileBuffer.js'

describe("Download service", () => {

    test("If it we can download server jar", async () => {
        const tmpFilePath = "/tmp/server.jar"
        if (existsSync(tmpFilePath)) unlinkSync(tmpFilePath)
        const downloadUrl = await DownloadService.generateUrlServerJar("paper", "1.20.2")
        const fileBuffer = await fetchFileBuffer(downloadUrl)
        writeFileSync(tmpFilePath, fileBuffer)
        assert.notEqual(statSync(tmpFilePath).size, 0)
    })
    
})


