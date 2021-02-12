'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { param, body } = require('express-validator')
const config = require('../configs')
const logger = require('../libs/logger')
const RestError = require('../libs/RestError')
const models = require('../models')
const schemas = require('../schemas')
const dump = require('../middlewares/dump')
const validate = require('../middlewares/validate')

const normalRowsPerPage = config.get('normalRowsPerPage')

router.get('/id/:id', [validate.id(param('id')), validate.result], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // load record
    const user = await models.Users.findByPk(id, {
        include: [
            {
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/list/:page', [validate.positiveOrZero(param('page')), validate.result], asyncHandler(async (req, res, next) => {
    // get request
    const { page } = req.params

    // load records
    const offset = page * normalRowsPerPage
    const query = {
        offset,
        limit: normalRowsPerPage
    }
    const count = await models.Users.count(query)
    const users = await models.Users.findAll(query)

    // success
    const ret = {
        paginator: {
            pageIndex: page,
            pageCount: Math.ceil(count / normalRowsPerPage),
            offset,
            limit: normalRowsPerPage,
            count
        },
        users,
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/add', [
    dump.body,
    validate.json(body('user'), schemas.createUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = {
        user: req.body.user
    }

    // insert
    const user = await models.Users.create(json.user, {
        include: [
            {
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })
    await user.reload()

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/:id', [
    dump.body,
    validate.id(param('id')),
    validate.json(body('user'), schemas.updateUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params
    const json = {
        user: req.body.user
    }

    // load record
    const user = await models.Users.findByPk(id, {
        include: [
            {
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })
    if (!user)
        throw new RestError(`no records`)

    // update
    if (json.user) {
        await user.update(json.user)
        await user.reload()
    }

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.delete('/:id', [validate.id(param('id')), validate.result], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // load record
    const user = await models.Users.findByPk(id)
    if (!user)
        throw new RestError(`no records`)

    // delete
    await user.destroy()

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
