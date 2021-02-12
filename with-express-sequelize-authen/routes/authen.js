'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { param, body } = require('express-validator')
const config = require('../configs')
const logger = require('../libs/logger')
const RestError = require('../libs/RestError')
const models = require('../models')
const schemas = require('../schemas')
const dump = require('../middlewares/dump')
const validate = require('../middlewares/validate')

router.post('/login', [
    dump.body,
    //validate.json(body('login'), schemas.login),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.login

    // check

    // success
    const ret = {
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/logout', [
    dump.body,
    //validate.json(body('logout'), schemas.logout),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.logout

    // check

    // success
    const ret = {
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/check', [], asyncHandler(async (req, res, next) => {
    // get request

    // check

    // success
    const ret = {
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
