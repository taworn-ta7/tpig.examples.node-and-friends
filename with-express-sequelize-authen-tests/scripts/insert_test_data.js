'use strict'
const { logger, db } = require('../libs')
const models = require('../models')
const { authen } = require('../middlewares')

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
