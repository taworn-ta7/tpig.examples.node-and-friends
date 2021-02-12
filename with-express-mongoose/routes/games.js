'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { param } = require('express-validator')
const config = require('../configs')
const logger = require('../libs/logger')
const RestError = require('../libs/RestError')
const models = require('../models')
const dump = require('../middlewares/dump')
const validate = require('../middlewares/validate')

const normalRowsPerPage = config.get('normalRowsPerPage')

router.get('/:id', [validate.ids(param('id')), validate.result], asyncHandler(async (req, res, next) => {
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

router.get('/list/:page', [validate.positiveOrZero(param('page')), validate.result], asyncHandler(async (req, res, next) => {
    // get request
    const { page } = parseInt(req.params)

    // load records
    const offset = page * normalRowsPerPage
    const count = await models.Users.count()
    const users = await models.Users.find().skip(offset).limit(normalRowsPerPage)

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

router.post('/add', [], asyncHandler(async (req, res, next) => {
    // get request
    const json = {
        //user: validate.json(schemas.createUser, req.body.user)
        user: req.body.user
    }

    // insert
    const user = new models.Users(json.user)
    await user.save()

    // success
    const ret = {
        user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.put('/:id', [], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params
    const json = {
        //user: validate.json(schemas.updateUser, req.body.user)
        user: req.body.user
    }

    // load record
    const user = await models.Users.findById(id)
    if (!user)
        throw new RestError(`no records`)

    // update
    if (json.user) {
        user.username = 'OK'
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

router.delete('/:id', [], asyncHandler(async (req, res, next) => {
    // get request
    const { id } = req.params

    // load record
    const user = await models.Users.findById(id).exec()
    if (!user)
        throw new RestError(`no records`)

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
