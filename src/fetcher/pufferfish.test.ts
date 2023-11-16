import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { pufferfishFetcher } from "./pufferfish.js";

describe("Pufferfish Fetcher", () => {
    test("Get download url for jar version", async () => {
        const { builds } = await pufferfishFetcher("1.19")
        const result = builds.filter((build) => build.id == 73)
        assert.equal(result.length, 1)
    })
})