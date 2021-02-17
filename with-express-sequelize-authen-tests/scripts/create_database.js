'use strict'
const config = require('../configs')
const { logger, http, db } = require('../libs')
const models = require('../models')

const authenUri = config.get('authenUri')

// running
const run = async () => {
    try {
        await db.sync({ force: true })

        let token

        {
            // login with admin
            const result = await http.json(`${authenUri}api/authen/login`, {
                method: 'POST',
                headers: http.jsonHeaders(),
                body: JSON.stringify({
                    login: {
                        username: 'admin',
                        password: 'admin//pass'
                    }
                })
            })
            token = result.user.token
        }

        {
            // list users, round by round
            let round = 0
            while (true) {
                const result = await http.json(`${authenUri}api/admin/list/${round++}`, {
                    method: 'GET',
                    headers: http.jsonHeaders(token)
                })
                if (result.paginate.pageSize <= 0)
                    break
                for (let i = 0; i < result.paginate.pageSize; i++) {
                    const item = result.users[i]
                    await models.Users.create({
                        id: item.id,
                        username: item.username,
                        displayName: item.displayName
                    })
                }
            }
        }
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
