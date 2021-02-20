'use strict'
const { logger, db } = require('../libs')
require('../models')

// running
const run = async () => {
    try {
        await db.sync({ force: true })
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
