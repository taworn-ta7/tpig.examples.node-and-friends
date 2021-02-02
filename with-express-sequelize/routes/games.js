'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const logger = require('../libs/logger')
const models = require('../models')

router.get('/:id', [], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
        ok: 1
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/list/:page?', [], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
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
