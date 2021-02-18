'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { checkSchema } = require('express-validator')
const config = require('../configs')
const { logger, http } = require('../libs')
const { dump, validate, authen } = require('../middlewares')

const authenUri = config.get('authenUri')

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

    // fetch
    const result = await http.json(`${authenUri}api/authen/login`, {
        method: 'POST',
        headers: http.jsonHeaders(),
        body: JSON.stringify({
            login: {
                username: json.username,
                password: json.password
            }
        })
    })
    http.handleErrors(result, 'user')

    // success
    const ret = {
        user: result.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/logout', [authen.required], asyncHandler(async (req, res, next) => {
    // fetch
    const result = await http.json(`${authenUri}api/authen/logout`, {
        method: 'POST',
        headers: http.jsonHeaders(req.user.token)
    })
    http.handleErrors(result, 'user')

    // success
    const ret = {
        user: result.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/check', [authen.optional], asyncHandler(async (req, res, next) => {
    // success
    const ret = {
        user: req.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
