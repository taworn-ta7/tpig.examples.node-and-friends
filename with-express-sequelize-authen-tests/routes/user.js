'use strict'
const router = require('express').Router()
const asyncHandler = require('express-async-handler')
const { body } = require('express-validator')
const config = require('../configs')
const { logger, http } = require('../libs')
const models = require('../models')
const schemas = require('../schemas')
const { dump, validate, authen } = require('../middlewares')

const authenUri = config.get('authenUri')

router.post('/register', [dump.body], asyncHandler(async (req, res, next) => {
    // fetch
    const result = http.handleErrors(await http.json(`${authenUri}api/user/register`, {
        method: 'POST',
        headers: http.jsonHeaders(),
        body: JSON.stringify(req.body, null, 4)
    }, { outputResult: 4 }))

    // insert
    await models.Users.create({
        id: result.user.id,
        username: result.user.username,
        displayName: result.user.displayName
    })

    // success
    const ret = {
        user: result.user
    }
    res.status(200).send(ret)
    logger.info(`${req.id} successful, output: ${JSON.stringify(ret, null, 4)}`)
    next()
}))

module.exports = router
