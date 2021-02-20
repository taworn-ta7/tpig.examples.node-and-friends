'use strict'
const logger = require('../libs/logger')
const models = require('../models')

module.exports = async () => {
    logger.verbose(`==================================================`)
    logger.verbose(`test list`)

    const list = await models.Users.find()
    logger.verbose(JSON.stringify(list, null, 4))

    logger.verbose(`--------------------------------------------------`)
}
