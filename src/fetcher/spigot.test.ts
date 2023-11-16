import test, { describe } from "node:test";
import assert from "node:assert/strict";
import { spigotFetcher } from "./spigot.js";

describe("Spigot Fetcher", () => {
  test("Spigot url will return Spiget download link", () => {
    const mockSpigotUrl = "https://www.spigotmc.org/resources/%E2%AD%90-huskhomes-1-16-1-20-%E2%AD%90-simple-intuitive-teleportation-suite-with-cross-server-support.83767/"
    const mockSpigetUrl = "https://api.spiget.org/v2/resources/83767/download"
    const {url} = spigotFetcher(mockSpigotUrl)
    assert.equal(url, mockSpigetUrl)
  })
})