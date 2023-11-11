import puppeteer from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth"

const { MCVERSIONS_URL } = process.env

puppeteer.use(StealthPlugin())

export const VanillaScraper = async (version: string): Promise<string> => {
    const browser = await puppeteer.launch({ channel: "chrome", headless: "new" })
    const page = await browser.newPage()
    page.goto(`${MCVERSIONS_URL}/download/${version}`)
    await page.setViewport({ width: 1080, height: 1024 });
    const textSelector = await page.waitForSelector("text/Download Server Jar")
    // @ts-expect-error
    const downloadUrl = await textSelector?.evaluate(el => el.href)
    await browser.close()
    return downloadUrl
}