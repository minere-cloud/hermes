import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { VanillaScraper } from "./vanilla.js";

describe("Vanilla Scraper", () => {
    test("Get download url for jar version", async () => {
        const mockVanillaDownloadUrl = "https://piston-data.mojang.com/v1/objects/5b868151bd02b41319f54c8d4061b8cae84e665c/server.jar"
        const downloadUrl = await VanillaScraper("1.20.2")
        assert.equal(downloadUrl, mockVanillaDownloadUrl)
    })
})