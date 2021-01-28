'use strict'
const logger = require('./libs/logger')
const db = require('./libs/db')
const tests = require('./tests')

// running
const run = async () => {
    try {
        logger.verbose(`sequelize`)

        await db.sync({ force: true })
        await tests.add()
        await tests.list()

        process.exit(0)
    }
    catch (ex) {
        logger.error(ex)
        process.exit(1)
    }
}
run()
