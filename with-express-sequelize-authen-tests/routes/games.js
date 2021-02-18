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
    authen.userRequired,
    dump.body,
    validate.id(param('id')),
    validate.json(body('profile'), schemas.updateProfile),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params
    const json = req.body.profile

    // select
    const profile = await models.Profiles.findOne({
        where: {
            id,
            uid: req.user.id
        },
        include: [models.Profiles.Items]
    })
    if (!profile)
        throw new RestError(`not found or permission denied`)

    // update
    if (Object.keys(json).length > 0) {
        await profile.update(json)
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
    validate.id(param('id')),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // select
    const profile = await models.Profiles.findOne({
        where: {
            id,
            uid: req.user.id
        },
    })
    if (!profile)
        throw new RestError(`not found or permission denied`)

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
