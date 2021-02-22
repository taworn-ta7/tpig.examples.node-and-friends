'use strict'
const { logger } = require('../libs')
const models = require('../models')

// running
const run = async () => {
    try {
        await models.Users.deleteMany()
        await models.Profiles.deleteMany()
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
