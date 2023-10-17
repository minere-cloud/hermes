import { describe, expect, test } from "bun:test"
import { fetchFileBuffer } from "./fetchFileBuffer"

describe("Fetch File Buffer", () => {
    test("We can fetch File Buffer", async () => {
        const mockUrl = "https://api.papermc.io/v2/projects/paper/versions/1.20.2/builds/240/downloads/paper-1.20.2-240.jar"
        const fileBuffer = await fetchFileBuffer(mockUrl)
        expect(fileBuffer).toBeDefined()
    })
})