'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const logger = require('../libs/logger')

router.get('/', [], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
        ok: true
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
