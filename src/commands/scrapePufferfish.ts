import { PufferfishScraper } from "../scrapers/pufferfish"
import { versionsToScrape } from "../helper/versionsToScrape"
import { saveBufferToS3 } from "../helper/saveBufferToS3"
import { fileExitsInS3 } from "../helper/fileExistsInS3"

const scraper = "pufferfish"

const scrapePufferfish = async () => {
    versionsToScrape(scraper).forEach(async (version, index) => {
        // Skip if is not latest or not exits
        if (await fileExitsInS3(`pufferfish/${version}/server.jar`) && index != 0) {
            return console.log(`Version ${version} already scraped. Skipping...`)
        }

        const buffer = await PufferfishScraper(version)
        saveBufferToS3(`${scraper}/${version}/server.jar`, buffer)
        console.log(`Scraped version ${version}.`)
    })
}

scrapePufferfish()