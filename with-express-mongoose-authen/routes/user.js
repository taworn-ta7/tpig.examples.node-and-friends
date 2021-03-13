'use strict'
const uuid = require('uuid')
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { body } = require('express-validator')
const { logger, RestError } = require('../libs')
const models = require('../models')
const schemas = require('../schemas')
const { dump, validate, authen } = require('../middlewares')

router.post('/register', [
    dump.body,
    validate.json(body('user'), schemas.createUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.user

    // load user
    if (await models.Users.findOne({ username: json.username }))
        throw new RestError(`already exists`, 403)

    // insert
    const password = authen.setPassword(json.password)
    const user = await models.Users.create({
        id: uuid.v4(),
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
    authen.userRequired,
    dump.body,
    validate.json(body('user'), schemas.updateUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.user
    let user = await authen.getUserFromDb(req)

    // check field(s)
    if (typeof json.displayName !== 'string')
        throw new RestError(`missing field(s)`, 400)

    // update user
    await user.update({
        displayName: json.displayName
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

router.put('/update/password', [
    authen.userRequired,
    dump.body,
    validate.json(body('user'), schemas.updateUserPassword),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.user
    let user = await authen.getUserFromDb(req)

    // check field(s)
    if (typeof json.password !== 'string')
        throw new RestError(`missing field(s)`, 400)

    // update user password
    const password = authen.setPassword(json.password)
    await user.update({
        salt: password.salt,
        hash: password.hash,
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

router.post('/unregister', [authen.userRequired], asyncHandler(async (req, res, next) => {
    // get request
    let user = await authen.getUserFromDb(req)

    // update user unregistered flag
    await user.update({
        unregistered: true,
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

module.exports = router
