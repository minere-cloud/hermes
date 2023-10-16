import { PaperScraper } from "../scrapers/paper"
import { versionsToScrape } from "../helper/versionsToScrape"
import { saveBufferToS3 } from "../helper/saveBufferToS3"
import { fileExitsInS3 } from "../helper/fileExistsInS3"
import { fetchBuffer } from "../helper/fetchBuffer"

const scraper = "paper"

const scrapePaper = async () => {

    versionsToScrape(scraper).forEach(async (version, index) => {
        // Skip if is not latest or not exits
        if (await fileExitsInS3(`paper/${version}/server.jar`) && index != 0) {
            return console.log(`Version ${version} already scraped. Skipping...`)
        }
        const downloadUrl = await PaperScraper(version)
        await saveBufferToS3(`${scraper}/${version}/server.jar`, await fetchBuffer(downloadUrl))
        console.log(`Scraped version ${version}.`)
    })
}

scrapePaper()