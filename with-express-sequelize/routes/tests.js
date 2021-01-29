'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const logger = require('../libs/logger')
const models = require('../models')

router.get('/', [], asyncHandler(async (req, res, next) => {
    // load data
    const items = await models.Users.findAll({
        include: [
            {
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })

    // success
    const ret = {
        items
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

router.post('/', [], asyncHandler(async (req, res, next) => {
    // save data
    const item = await models.Users.create({
        username: 'john',
        password: 'password',
        profiles: [
            {
                name: 'John Doe',
                items: [
                    { name: 'Final Fantasy I' },
                    { name: 'Final Fantasy II' },
                    { name: 'Final Fantasy III' }
                ]
            },
            {
                name: 'John Smith',
                items: [
                    { name: 'Dragon Quest IV' },
                    { name: 'Dragon Quest V' }
                ]
            }
        ]
    }, {
        include: [
            {
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })

    // success
    const ret = {
        item
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
