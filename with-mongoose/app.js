'use strict'
const logger = require('./libs/logger')
const db = require('./libs/db')
const models = require('./models')
const main = require('./main')

// running
const run = async () => {
    try {
        logger.verbose(`mongoose`)

        await main.add()
        await main.list()

        process.exit(0)
    }
    catch (ex) {
        logger.error(ex)
        process.exit(1)
    }
}
run()
