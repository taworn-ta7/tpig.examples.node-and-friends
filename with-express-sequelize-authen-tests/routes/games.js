'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { param, body } = require('express-validator')
const config = require('../configs')
const { logger, RestError, paginator } = require('../libs')
const models = require('../models')
const schemas = require('../schemas')
const { dump, validate, authen } = require('../middlewares')

const normalRowsPerPage = config.get('normalRowsPerPage')

router.post('/add', [
    //authen.required,
    dump.body,
    //validate.json(body('profile'), schemas.createProfile),
    validate.result,
    validate.checkJson('profile', schemas.createProfile)
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.profile

    // success
    const ret = {
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
