'use strict'
const asyncHandler = require('express-async-handler')
const config = require('../configs')
const logger = require('../libs/logger')
const RestError = require('../libs/RestError')
const models = require('../models')

const tokenFromHeaders = (req) => {
    const { headers: { authorization } } = req
    if (authorization) {
        const a = authorization.split(' ')
        if (a[0].toLowerCase() === 'bearer')
            return a[1]
    }
    return null
}

const required = asyncHandler(async (req, res, next) => {
    const token = tokenFromHeaders(req)
    if (!token)
        throw new RestError(`invalid token`)

    // search token in current users
    console.log(`token: ${token}`)
    const user = await models.Users.findOne({ where: { token } })
    if (!user)
        throw new RestError(`invalid token`)

    // check if expired login
    const now = new Date()
    console.log(`user: ${JSON.stringify(user, null, 4)}`)
    console.log(`expire ${user.expire} < now ${now}`)
    if (user.expire.getTime() < now.getTime())
        throw new RestError(`timeout`)

    // update expiry login
    const expire = now.getTime() + config.get('timeout')
    await user.update({
        expire: new Date(expire)
    })
    await user.reload()

    req.user = {
        id: user.id,
        username: user.username,
        displayName: user.displayName,
        role: user.role,
        disabled: user.disabled,
        unregistered: user.unregistered,
        begin: user.begin,
        end: user.end,
        expire: user.expire,
        token: user.token
    }
    next()
})

module.exports = {
    tokenFromHeaders,
    required
}
