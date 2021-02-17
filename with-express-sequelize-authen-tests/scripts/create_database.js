'use strict'
const { logger, db } = require('../libs')
const models = require('../models')
const { authen } = require('../middlewares')

// running
const run = async () => {
    try {
        await db.sync({ force: false })

        let token

        {
            const response = await authen.login('admin', 'admin//pass')
            const result = await response.json()
            console.log(`result: ${JSON.stringify(result, null, 4)}`)
            token = result.user.token
        }

        {
            const response = await authen.check(token)
            const result = await response.json()
            console.log(`result: ${JSON.stringify(result, null, 4)}`)
        }

        {
            const response = await authen.logout(token)
            const result = await response.json()
            console.log(`result: ${JSON.stringify(result, null, 4)}`)
        }
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
