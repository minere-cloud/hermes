import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { paperFetcher } from "./paper.js";

describe("Paper Fetcher", () => {
    test("Get download url for jar version", async () => {
        const {builds}  = await paperFetcher("1.20.1")
        const result = builds.filter((build) => build.id == 196)
        assert.equal(result.length, 1)
    })
})