'use strict'
const { logger } = require('./libs')
const tasks = require('./tasks')

// running
const run = async () => {
    try {
        logger.verbose(`mongoose`)

        await tasks.add()
        await tasks.list()

        process.exit(0)
    }
    catch (ex) {
        logger.error(ex)
        process.exit(1)
    }
}
run()
