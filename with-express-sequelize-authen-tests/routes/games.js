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

router.get('/id/:id', [validate.id(param('id')), validate.result], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // load record
    const profile = await models.Profiles.findByPk(id, {
        include: [models.Profiles.Items]
    })

    // success
    const ret = {
        profile
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/list/:page', [
    authen.required,
    validate.positiveOrZero(param('page')),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { page } = req.params

    // load records
    const query = {
        where: { uid: req.user.id },
        offset: page * normalRowsPerPage,
        limit: normalRowsPerPage
    }
    const count = await models.Profiles.count(query)
    const profiles = await models.Profiles.findAll(query)

    // success
    const ret = {
        paginate: paginator.get(page, normalRowsPerPage, count),
        profiles
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/add', [
    authen.required,
    dump.body,
    validate.json(body('profile'), schemas.createProfile),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const json = req.body.profile

    // insert
    json.uid = req.user.id
    const profile = await models.Profiles.create(json, {
        include: [models.Profiles.Items]
    })
    await profile.reload()

    // success
    const ret = {
        profile
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/:id', [
    authen.required,
    dump.body,
    validate.id(param('id')),
    validate.json(body('profile'), schemas.updateProfile),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params
    const json = req.body.profile

    // load record
    const profile = await models.Profiles.findByPk(id, {
        include: [models.Profiles.Items]
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
    authen.required,
    validate.id(param('id')),
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
