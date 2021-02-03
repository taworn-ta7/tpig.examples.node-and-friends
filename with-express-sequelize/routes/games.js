'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { param, validationResult } = require('express-validator')
const logger = require('../libs/logger')
const RestError = require('../libs/RestError')
const models = require('../models')
const validate = require('../middlewares/validate')

router.get('/:id', [validate.id(param('id'))], asyncHandler(async (req, res, next) => {
    validate.checkResult(req)

    // get request
    const { id } = req.params

    // success
    const ret = {
        id,
        ok: 1
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/list/:page?', [validate.int(param('page'))], asyncHandler(async (req, res, next) => {
    validate.checkResult(req)

    // get request
    const { page } = req.params

    // success
    const ret = {
        page,
        ok: 1
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/add', [], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
        ok: 1
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/:id', [], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
        ok: 1
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.delete('/:id', [], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
        ok: 1
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
