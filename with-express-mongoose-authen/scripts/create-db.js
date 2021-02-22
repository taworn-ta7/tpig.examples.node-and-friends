'use strict'
const uuid = require('uuid')
const { logger } = require('../libs')
const models = require('../models')
const { authen } = require('../middlewares')

// running
const run = async () => {
    try {
        await models.Users.deleteMany()
        await models.Profiles.deleteMany()

        let password = authen.setPassword('admin//pass')
        await models.Users.create({
            id: uuid.v4(),
            username: 'admin',
            displayName: 'Administrator',
            role: 'admin',
            salt: password.salt,
            hash: password.hash
        })

        password = authen.setPassword('user0//pass')
        await models.Users.create({
            id: uuid.v4(),
            username: 'user0',
            displayName: 'User 0',
            role: 'user',
            salt: password.salt,
            hash: password.hash
        })

        password = authen.setPassword('user1//pass')
        await models.Users.create({
            id: uuid.v4(),
            username: 'user1',
            displayName: 'User 1',
            role: 'user',
            salt: password.salt,
            hash: password.hash
        })

        password = authen.setPassword('user2//pass')
        await models.Users.create({
            id: uuid.v4(),
            username: 'user2',
            displayName: 'User 2',
            role: 'user',
            salt: password.salt,
            hash: password.hash
        })
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
