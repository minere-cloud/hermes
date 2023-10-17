import { PaperScraper } from "../scrapers/paper"
import { versionsToScrape } from "../helper/versionsToScrape"
import { fetchFileBuffer } from "../helper/fetchFileBuffer"
import { StorageService } from "../storage/storage.service"
import { logger } from "../lib/logger"

const scraper = "paper"

const scrapePaper = async () => {

    versionsToScrape(scraper).forEach(async (version, index) => {
        if (await StorageService().fileExits(`paper/${version}/server.jar`) && index != 0) {
            logger.info(`Version ${version} already scraped. Skipping...`)
            return
        }
        const downloadUrl = await PaperScraper(version)
        const fileBuffer = await fetchFileBuffer(downloadUrl)
        if(await StorageService().saveFile(`${scraper}/${version}/server.jar`, fileBuffer)) {
            logger.info(`Scraped version ${version}`)
            return
        }
        logger.error(`Scrape of version ${version} failed`)
    })
}

scrapePaper()