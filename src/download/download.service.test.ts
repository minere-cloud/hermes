import { describe, test } from 'node:test'
import assert from "node:assert/strict"
import { unlinkSync, existsSync, writeFileSync, statSync } from "fs"
import DownloadService from "./download.service.js"
import { fetchFileBuffer } from '../helper/fetchFileBuffer.js'

describe("Download service", () => {

    test("Spigot url will return Spiget download link", () => {
        const mockSpigotUrl = "https://www.spigotmc.org/resources/%E2%AD%90-huskhomes-1-16-1-20-%E2%AD%90-simple-intuitive-teleportation-suite-with-cross-server-support.83767/"
        const mockSpigetUrl = "https://api.spiget.org/v2/resources/83767/download"
        assert.equal(DownloadService.generateUrlSpigot(mockSpigotUrl), mockSpigetUrl)
    })

    test("Modrinth url will return download link", async () => {
        const mockModrinthUrl = "https://modrinth.com/plugin/coreprotect"
        const mockModrinthDownloadUrl = "https://cdn.modrinth.com/data/Lu3KuzdV/versions/w3P6ufP1/CoreProtect-22.2.jar"
        assert.equal(await DownloadService.generateUrlModrinth(mockModrinthUrl), mockModrinthDownloadUrl)
    })

    test("If it we can download server jar", async () => {
        const tmpFilePath = "/tmp/server.jar"
        if (existsSync(tmpFilePath)) unlinkSync(tmpFilePath)
        const downloadUrl = await DownloadService.generateUrlServerJar("paper", "1.20.2")
        const fileBuffer = await fetchFileBuffer(downloadUrl)
        writeFileSync(tmpFilePath, fileBuffer)
        assert.notEqual(statSync(tmpFilePath).size, 0)
    })
})


