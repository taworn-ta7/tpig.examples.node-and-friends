'use strict'
const logger = require('./libs/logger')
const db = require('./libs/db')
const main = require('./main')

// running
const run = async () => {
    try {
        logger.verbose(`sequelize`)

        await db.sync({ force: true })
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
