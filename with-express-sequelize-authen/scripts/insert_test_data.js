'use strict'
const crypto = require('crypto')
const config = require('../configs')
const logger = require('../libs/logger')
const db = require('../libs/db')
const models = require('../models')

const generateSecret = () => {
    return crypto.randomBytes(4).toString('hex')
}

const setPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex')
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    return { salt, hash }
}

const validatePassword = (password, salt, hash) => {
    const compareHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex')
    return hash === compareHash
}

// running
const run = async () => {
    try {
        await db.sync({ force: true })

        let password = setPassword('admin//pass')
        await models.Users.create({
            username: 'admin',
            displayName: 'Administrator',
            role: 'admin',
            secret: generateSecret(),
            salt: password.salt,
            hash: password.hash
        })

        password = setPassword('user0//pass')
        await models.Users.create({
            username: 'user0',
            displayName: 'User - 00',
            role: 'user',
            secret: generateSecret(),
            salt: password.salt,
            hash: password.hash
        })

        password = setPassword('user1//pass')
        await models.Users.create({
            username: 'user1',
            displayName: 'User - 01',
            role: 'user',
            secret: generateSecret(),
            salt: password.salt,
            hash: password.hash
        })

        password = setPassword('user2//pass')
        await models.Users.create({
            username: 'user2',
            displayName: 'User - 02',
            role: 'user',
            secret: generateSecret(),
            salt: password.salt,
            hash: password.hash
        })
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
