import { readFileSync } from "fs"

type FetcherConfig = {
  versions: string[]
}

const { CONFIG_PATH } = process.env

const configPath = CONFIG_PATH ?? 'config'

export const loadConfig = (name: string): FetcherConfig => {
  try {
    return JSON.parse(readFileSync(`${configPath}/${name}.json`).toString()) as FetcherConfig
  } catch {
    throw new Error(`Can't load config file. Does it exits?`)
  }
}