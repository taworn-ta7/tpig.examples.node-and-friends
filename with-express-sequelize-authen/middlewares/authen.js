'use strict'
const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const config = require('../configs')
const RestError = require('../libs/RestError')
const models = require('../models')

const validatePassword = (password, salt, hash) => {
    return hash === crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
}

const generateSecret = () => {
    const seed = crypto.randomBytes(128).toString('hex')
    return Buffer.from(seed).toString('base64')
}

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

    // search token
    const user = await models.Users.findOne({ where: { token } })
    if (!user)
        throw new RestError(`invalid token`)

    // check if expiry login
    const now = new Date()
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
    validatePassword,
    generateSecret,
    tokenFromHeaders,
    required
}
