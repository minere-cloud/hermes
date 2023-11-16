import puppeteer from "puppeteer"
import { Build, FetchResult } from "./typings.js"

const { MCVERSIONS_URL } = process.env

export const vanillaFetcher = async (version: string): Promise<FetchResult> => {
  const builds: Build[] = []
  const browser = await puppeteer.launch({ channel: "chrome", headless: "new" })
  const page = await browser.newPage()
  page.goto(`${MCVERSIONS_URL}/download/${version}`)
  await page.setViewport({ width: 1080, height: 1024 });
  const textSelector = await page.waitForSelector("text/Download Server Jar")
  // @ts-expect-error Putteer is broken
  const downloadUrl = await textSelector?.evaluate(el => el.href)
  await browser.close()
  builds.push({id: null, url: downloadUrl})
  return { builds }
}