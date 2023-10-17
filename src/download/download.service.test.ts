import { describe, test, expect } from 'bun:test'
import { DownloadService } from "./download.service"
import { fetchBuffer } from '../helper/fetchFileBuffer'
import { unlinkSync } from "fs"

describe("Download service", () => {

    test("Spigot url will return Spiget download link", () => {
        const mockSpigotUrl = "https://www.spigotmc.org/resources/%E2%AD%90-huskhomes-1-16-1-20-%E2%AD%90-simple-intuitive-teleportation-suite-with-cross-server-support.83767/"
        const mockSpigetUrl = "https://api.spiget.org/v2/resources/83767/download"
        expect(DownloadService().generateUrlSpigot(mockSpigotUrl)).toBe(mockSpigetUrl)
    })

    test("Spigot download url will return Spiget download link", () => {
        const mockSpigotUrl = "https://www.spigotmc.org/resources/%E2%AD%90-huskhomes-1-16-1-20-%E2%AD%90-simple-intuitive-teleportation-suite-with-cross-server-support.83767/download?version=516564"
        const mockSpigetUrl = "https://api.spiget.org/v2/resources/83767/download"
        expect(DownloadService().generateUrlSpigot(mockSpigotUrl)).toBe(mockSpigetUrl)
    })


    test("Modrinth url will return download link", async () => {
        const mockModrinthUrl = "https://modrinth.com/plugin/coreprotect"
        const mocktModrinthDownloadUrl = "https://cdn.modrinth.com/data/Lu3KuzdV/versions/w3P6ufP1/CoreProtect-22.2.jar"
        expect(await DownloadService().generateUrlModrinth(mockModrinthUrl)).toBe(mocktModrinthDownloadUrl)
    })

    test("If it we can download server jar", async () => {
        const tmpFilePath = "/tmp/server.jar"
        if (await Bun.file(tmpFilePath).exists()) unlinkSync(tmpFilePath)
        const downloadUrl = await DownloadService().generateUrlServerJar("paper", "1.20.2")
        const fileBuffer = await fetchBuffer(downloadUrl)
        await Bun.write(tmpFilePath, fileBuffer)
        expect(Bun.file(tmpFilePath).size).toBeGreaterThan(0)
    })
})


