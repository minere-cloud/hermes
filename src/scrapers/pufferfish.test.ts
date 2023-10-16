import { describe, expect, test } from "bun:test";
import { PufferfishScraper } from "./pufferfish";

describe("Pufferfish Scraper", () => {
    test("Get download url for jar version", async () => {
        const mockPufferfishDownloadUrl = "https://ci.pufferfish.host/job/Pufferfish-1.19/73/artifact/build/libs/pufferfish-paperclip-1.19.4-R0.1-SNAPSHOT-reobf.jar"
        const downloadUrl = await PufferfishScraper("1.19")
        expect(downloadUrl).toBe(mockPufferfishDownloadUrl)
    }, {retry: 3, timeout: 600})
})