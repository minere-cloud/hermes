import { Message } from "kafkajs";
import meow from "meow"
import { exit } from "process";
import { loadConfig } from "../src/lib/config.js";
import { kafkaClient } from "../src/lib/kafka.js";
import { paperFetcher } from "../src/fetcher/paper.js";
import { pufferfishFetcher } from './fetcher/pufferfish.js';
import { vanillaFetcher } from "./fetcher/vanilla.js";
import { logger } from "./lib/logger.js";

const cli = meow('Create Fetch Job', { importMeta: import.meta, flags: { type: { type: 'string', default: '', isRequired: true } } });

(async () => {
    const messages: Message[] = []
    const type = cli.flags.type
    const config = loadConfig(type)
    for (const version of config.versions) {
        switch (type) {
            case 'paper': {
                const { build, url } = await paperFetcher(version)
                messages.push({
                    value: JSON.stringify({ version, build, url })
                })
                break
            }
            case 'pufferfish': {
                const { build, url } = await pufferfishFetcher(version)
                messages.push({
                    value: JSON.stringify({ version, build, url })
                })
                break
            }
            case 'vanilla': {
                const { build, url } = await vanillaFetcher(version)
                messages.push({
                    value: JSON.stringify({ version, build, url })
                })
                break
            }
            default: {
               
                logger.info('Fetcher not found exiting...')
                exit(1)
            }
        }
    }
    const producer = kafkaClient.producer()
    await producer.connect()
    await producer.send({ messages: messages, topic: `fetch-${type}` })
    await producer.disconnect()
})()