'use strict'
const fetch = require('node-fetch')
const config = require('../configs')
const { logger, db } = require('../libs')
const models = require('../models')

const authenUri = config.get('authenUri')

// running
const run = async () => {
    try {
        await db.sync({ force: false })

        let token

        {
            const uri = `${authenUri}api/authen/login`
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    login: {
                        username: 'admin',
                        password: 'admin//pass'
                    }
                })
            }
            logger.info(`fetch: ${uri} ${JSON.stringify(options, null, 4)}`)
            const response = await fetch(uri, options)
            const result = await response.json()
            logger.verbose(`result: ${JSON.stringify(result, null, 4)}`)
            token = result.user.token
        }

        {
            const uri = `${authenUri}api/authen/check`
            const options = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${token}`
                }
            }
            logger.info(`fetch: ${uri} ${JSON.stringify(options, null, 4)}`)
            const response = await fetch(uri, options)
            const result = await response.json()
            logger.verbose(`result: ${JSON.stringify(result, null, 4)}`)
        }

        {
            const uri = `${authenUri}api/authen/logout`
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                    'Authorization': `Bearer ${token}`
                }
            }
            logger.info(`fetch: ${uri} ${JSON.stringify(options, null, 4)}`)
            const response = await fetch(uri, options)
            const result = await response.json()
            logger.verbose(`result: ${JSON.stringify(result, null, 4)}`)
        }
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
