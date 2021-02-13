'use strict'
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
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

const validatePassword = (password, salt, hash) => {
    return hash === crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
}

const generateSecret = () => {
    const seed = crypto.randomBytes(128).toString('hex')
    return Buffer.from(seed).toString('base64')
}

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

    // get user from database
    const user = await models.Users.findOne({ where: { username: json.username } })
    if (!user || !validatePassword(json.password, user.salt, user.hash))
        throw new RestError(`invalid username or/and password`, 422)

    // check if user disabled or unregistered
    if (user.unregistered)
        throw new RestError(`this user is unregistered`, 422)
    if (user.disabled)
        throw new RestError(`this user is locked by admin`, 422)

    // sign token
    const payload = {
        id: user.id,
        sub: user.username
    }
    const secret = generateSecret()
    const token = await jwt.sign(payload, secret, {})

    // update data
    const now = new Date()
    const expire = now.getTime() + config.get('timeout')
    await user.update({
        begin: now,
        expire: new Date(expire),
        token
    })
    await user.reload()

    // success
    const ret = {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        disabled: user.disabled,
        unregistered: user.unregistered,
        begin: user.begin,
        expire: user.expire
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
