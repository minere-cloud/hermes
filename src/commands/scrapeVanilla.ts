import { VanillaScraper } from '../scrapers/vanilla';
import { versionsToScrape } from '../helper/versionsToScrape';
import { saveBufferToS3 } from '../helper/saveBufferToS3';
import { fileExitsInS3 } from '../helper/fileExistsInS3';

const scraper = "vanilla"

const scrapeVanilla = () => {
    versionsToScrape(scraper).forEach(async (version) => {
        if(await fileExitsInS3(`vanilla/${version}/server.jar`)) return console.log(`Version ${version} already scraped. Skipping...`)
        const buffer = await VanillaScraper(version)
        await saveBufferToS3(`${scraper}/${version}/server.jar`, buffer)
        console.log(`Scraped version ${version}.`)
    })
}

scrapeVanilla()


