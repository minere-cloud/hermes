import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { modrinthFetcher } from "./modrinth.js";

describe("Modrinth Fetcher", () => {
  test("Modrinth url will return download link", async () => {
    const mockModrinthUrl = "https://modrinth.com/plugin/coreprotect"
    const mockModrinthDownloadUrl = "https://cdn.modrinth.com/data/Lu3KuzdV/versions/w3P6ufP1/CoreProtect-22.2.jar"
    const { url } = await modrinthFetcher(mockModrinthUrl)
    assert.equal(url, mockModrinthDownloadUrl)
  })
})