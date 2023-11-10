import { describe, expect, test } from "bun:test";
import { fetchFileBuffer } from "../helper/fetchFileBuffer";
import StorageService from "./storage.service";

describe("Storage Service", () => {
    test("File exists", async () => {
        const path = "paper/1.20.1/server.jar"
        const fileExits = await StorageService.fileExits(path)
        expect(fileExits).toBe(true)
    })
    
    test("File not exits", async () => {
        const path = "paper/20.1.1/server.jar"
        const fileExits = await StorageService.fileExits(path)
        expect(fileExits).toBe(false)
    })

    test("Save File Buffer", async () => {
        const mockUrl = "https://api.papermc.io/v2/projects/paper/versions/1.20.2/builds/240/downloads/paper-1.20.2-240.jar"
        const mockFilePath = "paper/1.20.2/server.jar"
        const fileBuffer = await fetchFileBuffer(mockUrl)
        await StorageService.saveFile(mockFilePath, fileBuffer)
        const fileExits = await StorageService.fileExits(mockFilePath)
        expect(fileExits).toBe(true)
    }, { timeout: 100000 })
})