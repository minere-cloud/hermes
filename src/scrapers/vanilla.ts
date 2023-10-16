import axios from "axios"
import puppeteer from "puppeteer-extra"
import StealthPlugin from "puppeteer-extra-plugin-stealth"

const {MCVERSIONS_URL} = process.env 

export const VanillaScraper = async (version: string): Promise<Buffer> => {
    console.log(`Scraping version ${version}`)
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({ channel: "chrome", headless: "new" })
    const page = await browser.newPage()
    page.goto(`${MCVERSIONS_URL}/download/${version}`)
    await page.setViewport({ width: 1080, height: 1024 });
    const textSelector = await page.waitForSelector("text/Download Server Jar")
    const downloadUrl = await textSelector?.evaluate(el => el.href)
    await browser.close()
    return (await axios.get(downloadUrl, { responseType: "arraybuffer" })).data as Buffer
}