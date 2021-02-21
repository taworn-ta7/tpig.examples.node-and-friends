'use strict'
const { logger } = require('../libs')
const models = require('../models')

// running
const run = async () => {
    try {
        await models.Users.deleteMany()

        process.exit(0)
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
