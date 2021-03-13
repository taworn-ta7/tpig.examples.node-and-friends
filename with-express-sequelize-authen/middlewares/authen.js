'use strict'
const crypto = require('crypto')
const asyncHandler = require('express-async-handler')
const config = require('../configs')
const RestError = require('../libs/RestError')
const models = require('../models')

const setPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    return { salt, hash }
}

const validatePassword = (password, salt, hash) => {
    const computeHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    return hash === computeHash
}

const generateSecret = () => {
    const seed = crypto.randomBytes(128).toString('hex')
    return Buffer.from(seed).toString('base64')
}

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

// ----------------------------------------------------------------------

const getUser = (user) => {
    return {
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
}

const getUserFromDb = async (req) => {
    const user = await models.Users.findByPk(req.user.id)
    if (!user)
        throw new RestError(`not exists`, 401)
    return user
}

// ----------------------------------------------------------------------

const getCurrentUser = async (req) => {
    const token = tokenFromHeaders(req)
    if (!token)
        throw new RestError(`invalid token`, 401)

    // search token
    const user = await models.Users.findOne({ where: { token } })
    if (!user)
        throw new RestError(`invalid token`, 401)

    // check if expiry login
    const now = new Date()
    if (user.expire.getTime() < now.getTime())
        throw new RestError(`timeout`)

    // update expiry login
    const expire = now.getTime() + config.get('timeout')
    await user.update({
        expire: new Date(expire)
    })

    return getUser(user)
}

const optional = asyncHandler(async (req, res, next) => {
    try {
        req.user = await getCurrentUser(req)
    }
    catch (ex) {
        req.user = null
    }
    next()
})

const required = asyncHandler(async (req, res, next) => {
    req.user = await getCurrentUser(req)
    next()
})

const userRequired = asyncHandler(async (req, res, next) => {
    const user = await getCurrentUser(req)
    if (user.role !== 'user')
        throw new RestError(`require user rights`, 403)
    req.user = user
    next()
})

const adminRequired = asyncHandler(async (req, res, next) => {
    const user = await getCurrentUser(req)
    if (user.role !== 'admin')
        throw new RestError(`require admin rights`, 403)
    req.user = user
    next()
})

// ----------------------------------------------------------------------

const checkPermission = (req, item, uid = 'uid') => {
    if (item === null)
        throw new RestError(`not found`, 404)
    if (item[uid] !== req.user.id)
        throw new RestError(`not enough permission`, 403)
    return item
}

module.exports = {
    setPassword,
    validatePassword,
    generateSecret,
    tokenFromHeaders,
    getUser,
    getUserFromDb,
    optional,
    required,
    userRequired,
    adminRequired,
    checkPermission
}
