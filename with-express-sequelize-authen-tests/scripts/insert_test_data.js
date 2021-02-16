'use strict'
const { logger, db } = require('../libs')
const models = require('../models')
const { authen } = require('../middlewares')

// running
const run = async () => {
    try {
        await db.sync({ force: true })

        let password = authen.setPassword('admin//pass')
        await models.Users.create({
            username: 'admin',
            displayName: 'Administrator',
            role: 'admin',
            salt: password.salt,
            hash: password.hash
        })

        password = authen.setPassword('user0//pass')
        await models.Users.create({
            username: 'user0',
            displayName: 'User 0',
            role: 'user',
            salt: password.salt,
            hash: password.hash
        })

        password = authen.setPassword('user1//pass')
        await models.Users.create({
            username: 'user1',
            displayName: 'User 1',
            role: 'user',
            salt: password.salt,
            hash: password.hash
        })

        password = authen.setPassword('user2//pass')
        await models.Users.create({
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
