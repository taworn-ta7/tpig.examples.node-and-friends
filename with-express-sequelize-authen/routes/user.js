'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { body } = require('express-validator')
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
    const password = authen.setPassword(json.password)
    const user = await models.Users.create({
        username: json.username,
        displayName: json.displayName,
        role: 'user',
        salt: password.salt,
        hash: password.hash
    })

    // success
    const ret = {
        user: authen.getUser(user)
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/update/displayName', [
    authen.required,
    validate.json(body('user'), schemas.updateUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.user
    const user = await authen.getUserFromDb(req)

    // check field(s)
    if (!json.displayName)
        throw new RestError(`missing field(s)`)

    // update user
    await user.update({
        displayName: json.displayName
    })

    // success
    const ret = {
        user: authen.getUser(user)
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/update/password', [
    authen.required,
    validate.json(body('user'), schemas.updateUserPassword),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.user
    const user = await authen.getUserFromDb(req)

    // check field(s)
    if (!json.password)
        throw new RestError(`missing field(s)`)

    // update user password
    const password = authen.setPassword(json.password)
    await user.update({
        salt: password.salt,
        hash: password.hash,
        end: new Date(),
        token: null
    })
    req.user = undefined

    // success
    const ret = {
        user: authen.getUser(user)
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/unregister', [authen.required], asyncHandler(async (req, res, next) => {
    // get request
    const user = await authen.getUserFromDb(req)

    // update user unregistered flag
    await user.update({
        unregistered: true,
        end: new Date(),
        token: null
    })
    req.user = undefined

    // success
    const ret = {
        user: authen.getUser(user)
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
