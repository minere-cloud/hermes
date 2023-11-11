import { PufferfishScraper } from "../scrapers/pufferfish.js"
import { versionsToScrape } from "../helper/versionsToScrape.js"
import { fetchFileBuffer } from "../helper/fetchFileBuffer.js"
import { logger } from "../lib/logger.js"
import StorageService from "../storage/storage.service.js"

const { R2_SERVER_JAR_BUCKET_NAME } = process.env

const scraper = "pufferfish"

const scrapePufferfish = async () => {
    versionsToScrape(scraper).forEach(async (version, index) => {
        if (await StorageService.fileExits(`pufferfish/${version}/server.jar`, R2_SERVER_JAR_BUCKET_NAME ?? "") && index != 0) {
            logger.info(`Version ${version} already scraped. Skipping...`)
            return
        }
        const downloadUrl = await PufferfishScraper(version)
        const fileBuffer = await fetchFileBuffer(downloadUrl)
        if (await StorageService.saveFile(`${scraper}/${version}/server.jar`, fileBuffer, R2_SERVER_JAR_BUCKET_NAME ?? "")) {
            logger.info(`Scraped version ${version}`)
            return
        }
        logger.error(`Scrape of version ${version} failed`)
    })
}

scrapePufferfish()