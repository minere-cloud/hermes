import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { paperFetcher } from "./paper.js";

describe("Paper Fetcher", () => {
    test("Get download url for jar version", async () => {
        const mockPaperDownloadUrl = "https://api.papermc.io/v2/projects/paper/versions/1.20.1/builds/196/downloads/paper-1.20.1-196.jar"
        const {url}  = await paperFetcher("1.20.1")
        assert.equal(url, mockPaperDownloadUrl)
    })
})