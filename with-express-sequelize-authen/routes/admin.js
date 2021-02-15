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
    validate.ids(param('username')),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { username } = req.params

    // load record
    const user = await models.Users.findOne({ where: { username } })

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/list/:page', [
    authen.adminRequired,
    validate.positiveOrZero(param('page')),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { page } = req.params

    // load records
    const query = {
        where: {
            role: 'user'
        },
        offset: page * normalRowsPerPage,
        limit: normalRowsPerPage
    }
    const count = await models.Users.count(query)
    const users = await models.Users.findAll(query)

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
    validate.ids(param('username')),
    validate.json(body('user'), schemas.updateUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { username } = req.params
    const json = req.body.user

    // load record
    const user = await models.Users.findOne({ where: { username, role: 'user' } })
    if (!user)
        throw new RestError(`not exists`)

    // update
    if (typeof json.disabled === 'boolean') {
        await user.update({
            disabled: json.disabled,
            end: new Date(),
            token: null
        })
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
