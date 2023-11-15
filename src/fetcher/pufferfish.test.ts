import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { pufferfishFetcher } from "./pufferfish.js";

describe("Pufferfish Fetcher", () => {
    test("Get download url for jar version", async () => {
        const mockPufferfishDownloadUrl = "https://ci.pufferfish.host/job/Pufferfish-1.19/73/artifact/build/libs/pufferfish-paperclip-1.19.4-R0.1-SNAPSHOT-reobf.jar"
        const { url } = await pufferfishFetcher("1.19")
        assert.equal(url, mockPufferfishDownloadUrl)
    })
})