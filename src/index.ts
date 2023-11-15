import { initConsumers } from "./consume.js";
import { logger } from "./lib/logger.js";
import { initServer } from "./server.js";

const { APP_MODE } = process.env;

(async () => {
    switch (APP_MODE) {
        case 'serve':
            logger.info('Starting app in serve mode.')
            initServer()
            break
        case 'consume':
            logger.info('Starting app in consume mode.')
            initConsumers()
            break
        default:
            logger.error('App mode is not valid')
            break;
    }
})()