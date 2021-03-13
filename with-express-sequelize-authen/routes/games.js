'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { param, body } = require('express-validator')
const config = require('../configs')
const { logger, RestError, paginator } = require('../libs')
const models = require('../models')
const schemas = require('../schemas')
const { dump, validate, authen } = require('../middlewares')

const normalRowsPerPage = config.get('normalRowsPerPage')

router.get('/:page?', [
    authen.userRequired,
    validate.intOrEmpty(param('page')),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    let page = Number(req.params.page)
    if (!page || page < 0)
        page = 0

    // select
    const query = {
        include: {
            model: models.Profiles,
            where: {
                uid: req.user.id
            },
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
    authen.userRequired,
    dump.body,
    validate.json(body('profile'), schemas.createProfile),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.profile

    // insert
    json.uid = req.user.id
    const profile = await models.Profiles.create(json, {
        include: [models.Items]
    })
    await profile.reload()

    // success
    const ret = {
        profile
    }
    res.status(201).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/:id', [
    authen.userRequired,
    dump.body,
    validate.int(param('id')),
    validate.json(body('profile'), schemas.updateProfile),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params
    const json = req.body.profile

    // load record
    const profile = await models.Profiles.findByPk(id, {
        include: [models.Items]
    })
    authen.checkPermission(req, profile)

    // update
    if (Object.keys(json).length > 0) {
        await profile.update(json)
        await profile.reload()
    }

    // success
    const ret = {
        profile
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.delete('/:id', [
    authen.userRequired,
    validate.int(param('id')),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // load record
    const profile = await models.Profiles.findByPk(id)
    authen.checkPermission(req, profile)

    // delete
    await profile.destroy()

    // success
    const ret = {
        profile
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
