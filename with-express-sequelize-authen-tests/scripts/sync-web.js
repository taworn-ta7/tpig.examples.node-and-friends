'use strict'
const config = require('../configs')
const { logger, http } = require('../libs')

const targetDb = require('../libs/db')
const TargetUsers = require('../models/Users')

const authenUri = config.get('authenUri')

// running
const run = async () => {
    try {
        await targetDb.sync({ force: false })

        // login
        const result = http.handleErrors(await http.json(`${authenUri}api/authen/login`, {
            method: 'POST',
            headers: http.jsonHeaders(),
            body: JSON.stringify({
                login: {
                    username: 'admin',
                    password: 'admin//pass'
                }
            })
        }))
        let token = result.user.token

        let counter = 0
        let page = 0
        while (true) {
            // select source
            const result = http.handleErrors(await http.json(`${authenUri}api/admin/list/${page}`, {
                method: 'GET',
                headers: http.jsonHeaders(token)
            }))
            const items = result.users
            if (!items || items.length <= 0)
                break
            page++

            // upsert target
            for (let i = 0; i < items.length; i++) {
                const source = items[i]
                const target = await TargetUsers.upsert({
                    id: source.id,
                    username: source.username,
                    displayName: source.displayName
                })
                logger.verbose(`${counter}: ${JSON.stringify(target)}`)
                counter++
            }
        }
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
