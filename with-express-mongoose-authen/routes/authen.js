'use strict'
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { checkSchema } = require('express-validator')
const config = require('../configs')
const { logger, RestError } = require('../libs')
const models = require('../models')
const { dump, validate, authen } = require('../middlewares')

router.post('/login', [
    dump.body,
    checkSchema({
        'login.username': {
            in: ['body'],
            exists: { checkNull: true, checkFalsy: true },
            trim: {},
            isLength: { min: 4 }
        },
        'login.password': {
            in: ['body'],
            exists: { checkNull: true, checkFalsy: true },
            isLength: { min: 4 }
        }
    }),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.login

    // load user
    let user = await models.Users.findOne({ username: json.username })
    if (!user || !authen.validatePassword(json.password, user.salt, user.hash))
        throw new RestError(`invalid username or/and password`, 422)

    // check if user disabled or unregistered
    if (user.unregistered)
        throw new RestError(`this user is unregistered`, 422)
    if (user.disabled)
        throw new RestError(`this user is disabled by admin`, 422)

    // sign token
    const now = new Date()
    const expire = now.getTime() + config.get('timeout')
    const payload = {
        id: user.id,
        sub: user.username,
        exp: expire
    }
    const secret = authen.generateSecret()
    logger.debug(`${req.id} secret: ${secret}`)
    const token = await jwt.sign(payload, secret, {})

    // update user
    await user.updateOne({
        begin: now,
        end: null,
        expire: new Date(expire),
        token
    })
    user = await models.Users.findById(user._id)

    // success
    const ret = {
        user: authen.getUser(user)
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/logout', [authen.required], asyncHandler(async (req, res, next) => {
    // get request
    let user = await authen.getUserFromDb(req)

    // update user
    await user.updateOne({
        end: new Date(),
        token: null
    })
    user = await models.Users.findById(user._id)
    req.user = undefined

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
