'use strict'
const { logger, db } = require('../libs')

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
