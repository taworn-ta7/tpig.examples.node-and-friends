'use strict'
const jwt = require('jsonwebtoken')
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { checkSchema } = require('express-validator')
const config = require('../configs')
const logger = require('../libs/logger')
const RestError = require('../libs/RestError')
const models = require('../models')
const schemas = require('../schemas')
const dump = require('../middlewares/dump')
const validate = require('../middlewares/validate')
const authen = require('../middlewares/authen')

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
    const user = await models.Users.findOne({ where: { username: json.username } })
    if (!user || !authen.validatePassword(json.password, user.salt, user.hash))
        throw new RestError(`invalid username or/and password`, 422)

    // check if user disabled or unregistered
    if (user.unregistered)
        throw new RestError(`this user is unregistered`, 422)
    if (user.disabled)
        throw new RestError(`this user is disabled by admin`, 422)

    // sign token
    const payload = {
        id: user.id,
        sub: user.username
    }
    const secret = authen.generateSecret()
    const token = await jwt.sign(payload, secret, {})

    // update user
    const now = new Date()
    const expire = now.getTime() + config.get('timeout')
    await user.update({
        begin: now,
        end: null,
        expire: new Date(expire),
        token
    })

    // success
    const ret = {
        user: authen.extractUser(user)
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/logout', [authen.required], asyncHandler(async (req, res, next) => {
    // get request
    const user = await authen.get(req)

    // update user
    await user.update({
        end: new Date(),
        token: null
    })
    req.user = undefined

    // success
    const ret = {
        user: authen.extractUser(user)
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
