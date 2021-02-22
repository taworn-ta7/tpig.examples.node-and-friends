'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { param, body } = require('express-validator')
const config = require('../configs')
const { logger, RestError, paginator } = require('../libs')
const models = require('../models')
const schemas = require('../schemas')
const { validate, authen } = require('../middlewares')

const normalRowsPerPage = config.get('normalRowsPerPage')

router.get('/id/:username', [
    authen.adminRequired,
    param('username').exists().trim().isString(),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { username } = req.params

    // load record
    const user = await models.Users.findOne({ username })

    // success
    const ret = {
        user
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

    // load records
    const query = {
        role: 'user'
    }
    const count = await models.Users.count(query)
    const users = await models.Users.find(query).skip(page * normalRowsPerPage).limit(normalRowsPerPage)

    // success
    const ret = {
        paginate: paginator.get(page, normalRowsPerPage, count),
        users,
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/disable/:username', [
    authen.adminRequired,
    param('username').exists().trim().isString(),
    validate.json(body('user'), schemas.updateUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { username } = req.params
    const json = req.body.user

    // load record
    let user = await models.Users.findOne({ username, role: 'user' })
    if (!user)
        throw new RestError(`not exists`)

    // update
    if (typeof json.disabled === 'boolean') {
        await user.update({
            disabled: json.disabled,
            end: new Date(),
            token: null
        })
        user = await models.Users.findById(user._id)
    }

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
