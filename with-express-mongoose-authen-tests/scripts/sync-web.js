'use strict'
const config = require('../configs')
const { logger, http } = require('../libs')

const targetDb = require('../libs/db')
const TargetUsers = require('../models/Users')

const authenUri = config.get('authenUri')

// running
const run = async () => {
    try {
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
                let target = await TargetUsers.findOne({ id: source.id })
                if (target) {
                    await target.updateOne({
                        username: source.username,
                        displayName: source.displayName
                    })
                    target = await TargetUsers.findById(target._id)
                }
                else {
                    target = await TargetUsers.create({
                        id: source.id,
                        username: source.username,
                        displayName: source.displayName
                    })
                }
                logger.verbose(`${counter}: ${JSON.stringify(target)}`)
                counter++
            }
        }
        process.exit(0)
    }
    catch (ex) {
        logger.error(ex)
        process.exit(1)
    }
}
run()
