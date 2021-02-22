'use strict'
const asyncHandler = require('express-async-handler')
const config = require('../configs')
const { RestError, http } = require('../libs')

const authenUri = config.get('authenUri')

const tokenFromHeaders = (req) => {
    const { headers: { authorization } } = req
    if (authorization) {
        const a = authorization.split(' ')
        if (a.length >= 2) {
            if (a[0].toLowerCase() === 'bearer') {
                return a[1]
            }
        }
    }
    return null
}

const checkToken = async (req) => {
    const token = tokenFromHeaders(req)
    if (token) {
        const result = await http.json(`${authenUri}api/authen/check`, {
            method: 'GET',
            headers: http.jsonHeaders(token)
        })
        if (result && result.user)
            return result.user
    }
    return null
}

const optional = asyncHandler(async (req, res, next) => {
    const user = await checkToken(req)
    req.user = user
    next()
})

const required = asyncHandler(async (req, res, next) => {
    const user = await checkToken(req)
    if (!user)
        throw new RestError(`invalid token`)
    req.user = user
    next()
})

const userRequired = asyncHandler(async (req, res, next) => {
    const user = await checkToken(req)
    if (!user)
        throw new RestError(`invalid token`)
    if (user.role !== 'user')
        throw new RestError(`not user role`)
    req.user = user
    next()
})

const adminRequired = asyncHandler(async (req, res, next) => {
    const user = await checkToken(req)
    if (!user)
        throw new RestError(`invalid token`)
    if (user.role !== 'admin')
        throw new RestError(`not admin role`)
    req.user = user
    next()
})

module.exports = {
    optional,
    required,
    userRequired,
    adminRequired
}
