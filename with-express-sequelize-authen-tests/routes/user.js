'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { body } = require('express-validator')
const config = require('../configs')
const { logger, http } = require('../libs')
const models = require('../models')
const schemas = require('../schemas')
const { dump, validate, authen } = require('../middlewares')

const authenUri = config.get('authenUri')

router.post('/register', [dump.body], asyncHandler(async (req, res, next) => {
    // fetch
    const result = http.handleErrors(await http.json(`${authenUri}api/user/register`, {
        method: 'POST',
        headers: http.jsonHeaders(),
        body: JSON.stringify(req.body, null, 4)
    }, { input: 1, output: 1 }))

    // insert
    await models.Users.create({
        id: result.user.id,
        username: result.user.username,
        displayName: result.user.displayName
    })

    // success
    const ret = {
        user: result.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/update/displayName', [authen.userRequired], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.user

    // check field(s)
    if (!json || typeof json.displayName !== 'string')
        throw new RestError(`missing field(s)`)

    // fetch
    const result = http.handleErrors(await http.json(`${authenUri}api/user/update/displayName`, {
        method: 'PUT',
        headers: http.jsonHeaders(req.user.token),
        body: JSON.stringify({
            user: {
                displayName: json.displayName
            }
        })
    }, { input: 1, output: 1 }))

    // update
    const user = await models.Users.findByPk(req.user.id)
    await user.update({
        displayName: json.displayName
    })

    // success
    const ret = {
        user: result.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/update/password', [authen.userRequired], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.user

    // check field(s)
    if (!json || typeof json.password !== 'string')
        throw new RestError(`missing field(s)`)

    // fetch
    const result = http.handleErrors(await http.json(`${authenUri}api/user/update/password`, {
        method: 'PUT',
        headers: http.jsonHeaders(req.user.token),
        body: JSON.stringify({
            user: {
                password: json.password,
                confirmPassword: json.confirmPassword
            }
        })
    }, { input: 1, output: 1 }))

    // update
    const user = await models.Users.findByPk(req.user.id)
    await user.update({
        password: json.password
    })

    // logout
    req.user = undefined

    // success
    const ret = {
        user: result.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/unregister', [authen.userRequired], asyncHandler(async (req, res, next) => {
    // fetch
    const result = http.handleErrors(await http.json(`${authenUri}api/user/unregister`, {
        method: 'POST',
        headers: http.jsonHeaders(req.user.token)
    }, { input: 1, output: 1 }))

    // logout
    req.user = undefined

    // success
    const ret = {
        user: result.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
