'use strict'
const { logger, db } = require('../libs')
const models = require('../models')

// running
const run = async () => {
    try {
        await models.Users.deleteMany()

        process.exit(0)
    }
    catch (ex) {
        logger.error(ex)

        process.exit(1)
    }
}
run()
