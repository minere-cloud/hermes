import { describe, expect, test } from "bun:test";
import { PaperScraper } from "./paper";

describe("Paper Scraper", () => {
    test("Get download url for jar version", async () => {
        const mockPaperDownloadUrl = "https://api.papermc.io/v2/projects/paper/versions/1.20.1/builds/196/downloads/paper-1.20.1-196.jar"
        expect(await PaperScraper("1.20.1")).toBe(mockPaperDownloadUrl)
    })
})