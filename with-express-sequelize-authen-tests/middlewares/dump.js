'use strict'
const logger = require('../libs/logger')

const headers = (req, res, next) => {
    logger.verbose(`${req.id} request headers: ${JSON.stringify(req.headers, null, 4)}`)
    next()
}

const body = (req, res, next) => {
    logger.verbose(`${req.id} request body: ${JSON.stringify(req.body, null, 4)}`)
    next()
}

module.exports = {
    headers,
    body
}
