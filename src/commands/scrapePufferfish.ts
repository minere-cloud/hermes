import { PufferfishScraper } from "../scrapers/pufferfish"
import { versionsToScrape } from "../helper/versionsToScrape"
import { fetchFileBuffer } from "../helper/fetchFileBuffer"
import { logger } from "../lib/logger"
import StorageService from "../storage/storage.service"

const scraper = "pufferfish"

const scrapePufferfish = async () => {
    versionsToScrape(scraper).forEach(async (version, index) => {
        if (await StorageService.fileExits(`pufferfish/${version}/server.jar`) && index != 0) {
            logger.info(`Version ${version} already scraped. Skipping...`)
            return
        }
        const downloadUrl = await PufferfishScraper(version)
        const fileBuffer = await fetchFileBuffer(downloadUrl)
        if (await StorageService.saveFile(`${scraper}/${version}/server.jar`, fileBuffer)) {
            logger.info(`Scraped version ${version}`)
            return
        }
        logger.error(`Scrape of version ${version} failed`)
    })
}

scrapePufferfish()