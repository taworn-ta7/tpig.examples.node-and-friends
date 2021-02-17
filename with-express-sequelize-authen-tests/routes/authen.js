'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const config = require('../configs')
const { logger, RestError } = require('../libs')
const models = require('../models')
const { dump, validate, authen } = require('../middlewares')

const authenUri = config.get('authenUri')

router.post('/login', [], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
        user: authen.getUser(user)
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/logout', [authen.required], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
        user: authen.getUser(user)
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/check', [authen.required], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
        user: req.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
