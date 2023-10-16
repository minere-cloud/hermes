import { PufferfishScraper } from "../scrapers/pufferfish"
import { versionsToScrape } from "../helper/versionsToScrape"
import { saveBufferToS3 } from "../helper/saveBufferToS3"
import { fileExitsInS3 } from "../helper/fileExistsInS3"
import { fetchBuffer } from "../helper/fetchBuffer"

const scraper = "pufferfish"

const scrapePufferfish = async () => {
    versionsToScrape(scraper).forEach(async (version, index) => {
        if (await fileExitsInS3(`pufferfish/${version}/server.jar`) && index != 0) {
            return console.log(`Version ${version} already scraped. Skipping...`)
        }
        const downloadUrl = await PufferfishScraper(version)
        saveBufferToS3(`${scraper}/${version}/server.jar`, await fetchBuffer(downloadUrl))
        console.log(`Scraped version ${version}.`)
    })
}

scrapePufferfish()