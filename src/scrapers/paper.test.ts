import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { PaperScraper } from "./paper.js";

describe("Paper Scraper", () => {
    test("Get download url for jar version", async () => {
        const mockPaperDownloadUrl = "https://api.papermc.io/v2/projects/paper/versions/1.20.1/builds/196/downloads/paper-1.20.1-196.jar"
        const downloadUrl = await PaperScraper("1.20.1")
        assert.equal(downloadUrl, mockPaperDownloadUrl)
    })
})