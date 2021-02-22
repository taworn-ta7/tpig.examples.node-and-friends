'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { param, checkSchema } = require('express-validator')
const config = require('../configs')
const { logger, RestError, http } = require('../libs')
const { validate, authen } = require('../middlewares')

const authenUri = config.get('authenUri')

router.get('/id/:username', [
    authen.adminRequired,
    param('username').exists().trim().isString(),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { username } = req.params

    // fetch
    const result = http.handleErrors(await http.json(`${authenUri}api/admin/id/${username}`, {
        method: 'GET',
        headers: http.jsonHeaders(req.user.token)
    }, { input: 1, output: 1 }))
    if (!result.user)
        throw new RestError(`not found`)

    // success
    const ret = {
        user: result.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/list/:page?', [
    authen.adminRequired,
    validate.intOrEmpty(param('page')),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    let page = Number(req.params.page)
    if (!page || page < 0)
        page = 0

    // fetch
    const result = http.handleErrors(await http.json(`${authenUri}api/admin/list/${page}`, {
        method: 'GET',
        headers: http.jsonHeaders(req.user.token)
    }, { input: 1, output: 1 }))
    if (!result.paginate || !result.users)
        throw new RestError(`not found`)

    // success
    const ret = {
        paginate: result.paginate,
        users: result.users
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/disable/:username', [
    authen.adminRequired,
    param('username').exists().trim().isString(),
    checkSchema({
        'user.disabled': {
            in: ['body'],
            isBoolean: {}
        }
    }),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { username } = req.params

    // fetch
    const result = http.handleErrors(await http.json(`${authenUri}api/admin/disable/${username}`, {
        method: 'POST',
        headers: http.jsonHeaders(req.user.token),
        body: JSON.stringify(req.body)
    }, { input: 1, output: 1 }))
    if (!result.user)
        throw new RestError(`not found`)

    // success
    const ret = {
        user: result.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
