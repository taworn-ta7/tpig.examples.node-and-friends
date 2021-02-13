'use strict'
const crypto = require('crypto')
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { body } = require('express-validator')
const config = require('../configs')
const logger = require('../libs/logger')
const RestError = require('../libs/RestError')
const models = require('../models')
const schemas = require('../schemas')
const dump = require('../middlewares/dump')
const validate = require('../middlewares/validate')
const authen = require('../middlewares/authen')

router.post('/register', [
    dump.body,
    validate.json(body('user'), schemas.createUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.user

    // load user
    if (await models.Users.findOne({ where: { username: json.username } }))
        throw new RestError(`already exists`)

    // insert
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(json.password, salt, 10000, 512, 'sha512').toString('hex')
    const user = await models.Users.create({
        username: json.username,
        displayName: json.displayName,
        role: 'user',
        salt,
        hash
    })

    // success
    const ret = {
        user: {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            role: user.role,
            disabled: user.disabled,
            unregistered: user.unregistered,
            begin: user.begin,
            end: user.end,
            expire: user.expire,
            token: user.token
        }
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
