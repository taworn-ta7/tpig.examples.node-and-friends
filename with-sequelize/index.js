'use strict'
const { logger, db } = require('./libs')
require('./models')
const tasks = require('./tasks')

// running
const run = async () => {
    try {
        logger.verbose(`sequelize`)

        await db.sync({ force: true })
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
