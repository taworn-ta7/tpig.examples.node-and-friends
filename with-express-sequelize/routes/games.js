'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { param, body } = require('express-validator')
const config = require('../configs')
const { logger, RestError, paginator } = require('../libs')
const models = require('../models')
const schemas = require('../schemas')
const { dump, validate } = require('../middlewares')

const normalRowsPerPage = config.get('normalRowsPerPage')

router.get('/:page?', [validate.intOrEmpty(param('page')), validate.result], asyncHandler(async (req, res, next) => {
    // get request
    let page = Number(req.params.page)
    if (!page || page < 0)
        page = 0

    // select
    const query = {
        include: {
            model: models.Profiles,
            include: {
                model: models.Users
            }
        },
        offset: page * normalRowsPerPage,
        limit: normalRowsPerPage
    }
    const count = await models.Items.count(query)
    const items = await models.Items.findAll(query)

    // success
    const ret = {
        paginate: paginator.get(page, normalRowsPerPage, count),
        items
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/', [
    dump.body,
    validate.json(body('user'), schemas.createUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.user

    // insert
    const user = await models.Users.create(json, {
        include: [
            {
                model: models.Profiles,
                include: [models.Items]
            }
        ]
    })
    await user.reload()

    // success
    const ret = {
        user
    }
    res.status(201).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/:id', [
    dump.body,
    validate.int(param('id')),
    validate.json(body('user'), schemas.updateUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params
    const json = req.body.user

    // load record
    const user = await models.Users.findByPk(id, {
        include: [
            {
                model: models.Profiles,
                include: [models.Items]
            }
        ]
    })
    if (!user)
        throw new RestError(`no records`, 404)

    // update
    if (json) {
        await user.update(json)
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

router.delete('/:id', [validate.int(param('id')), validate.result], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // load record
    const user = await models.Users.findByPk(id)
    if (!user)
        throw new RestError(`no records`, 404)

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
