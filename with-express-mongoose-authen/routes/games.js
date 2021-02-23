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
        uid: req.user.id
    }
    const count = await models.Profiles.count(query)
    const profiles = await models.Profiles.find(query).skip(page * normalRowsPerPage).limit(normalRowsPerPage)

    // success
    const ret = {
        paginate: paginator.get(page, normalRowsPerPage, count),
        profiles
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
    const profile = await models.Profiles.create(json)

    // success
    const ret = {
        profile
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/:id', [
    authen.userRequired,
    dump.body,
    param('id').exists().trim().isString(),
    validate.json(body('profile'), schemas.updateProfile),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params
    const json = req.body.profile

    // load record
    let profile = await models.Profiles.findById(id)
    authen.checkPermission(req, profile)

    // update
    if (Object.keys(json).length > 0) {
        await profile.updateOne(json)
        profile = await models.Profiles.findById(profile._id)
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
    param('id').exists().trim().isString(),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // load record
    const profile = await models.Profiles.findById(id)
    authen.checkPermission(req, profile)

    // delete
    await profile.deleteOne()

    // success
    const ret = {
        profile
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
