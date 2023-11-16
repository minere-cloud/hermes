import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { vanillaFetcher } from "./vanilla.js";

describe("Vanilla Fetcher", () => {
    test("Get download url for jar version", async () => {
        const mockVanillaDownloadUrl = "https://piston-data.mojang.com/v1/objects/5b868151bd02b41319f54c8d4061b8cae84e665c/server.jar"
        const {builds}  = await vanillaFetcher("1.20.2")
        const result = builds.filter((build) => build.url == mockVanillaDownloadUrl)
        assert.equal(result.length, 1)
    })
})