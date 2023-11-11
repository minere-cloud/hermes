import { describe, test } from "node:test";
import assert from "node:assert/strict";
import StorageService from "./storage.service.js";

const { R2_SERVER_JAR_BUCKET_NAME } = process.env

describe("Storage Service", () => {
    test("File exists", async () => {
        const path = "paper/1.20.1/server.jar"
        const fileExits = await StorageService.fileExits(path, R2_SERVER_JAR_BUCKET_NAME ?? "")
        assert.ok(fileExits)
    })

    test("File not exits", async () => {
        const path = "paper/20.1.1/server.jar"
        const fileExits = await StorageService.fileExits(path, R2_SERVER_JAR_BUCKET_NAME ?? "")
        assert.ok(!fileExits)
    })

    test("Save File Buffer", async () => {
        const mockFilePath = "test.buffer"
        const fileBuffer = Buffer.from("Hello world")
        await StorageService.saveFile(mockFilePath, fileBuffer, R2_SERVER_JAR_BUCKET_NAME ?? "")
        const fileExits = await StorageService.fileExits(mockFilePath, R2_SERVER_JAR_BUCKET_NAME ?? "")
        assert.ok(fileExits)
    })
})