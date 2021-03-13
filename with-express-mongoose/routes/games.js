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

router.get('/id/:id', [
    param('id').exists().trim().isString(),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // load record
    const user = await models.Users.findById(id)

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.get('/list/:page?', [
    validate.intOrEmpty(param('page')),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    let page = Number(req.params.page)
    if (!page || page < 0)
        page = 0

    // load records
    const count = await models.Users.count()
    const users = await models.Users.find().skip(page * normalRowsPerPage).limit(normalRowsPerPage)

    // success
    const ret = {
        paginate: paginator.get(page, normalRowsPerPage, count),
        users
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
    const user = new models.Users(json)
    await user.save()

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
    param('id').exists().trim().isString(),
    validate.json(body('user'), schemas.updateUser),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params
    const json = req.body.user

    // load record
    const user = await models.Users.findById(id)
    if (!user)
        throw new RestError(`no records`, 404)

    // update
    if (json) {
        for (let i = 0; i < user.profiles.length; i++) {
            user.profiles[i].name = '?'
        }
        await user.save()
    }

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.delete('/:id', [
    param('id').exists().trim().isString(),
    validate.result
], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // load record
    const user = await models.Users.findById(id).exec()
    if (!user)
        throw new RestError(`no records`, 404)

    // delete
    await models.Users.deleteOne({ _id: user._id })

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
