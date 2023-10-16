import { readFileSync } from "fs"

export const versionsToScrape = (scraper: string): string[] => {
    return JSON.parse(readFileSync(`config/scrapers/${scraper}.json`).toString()).versions
}