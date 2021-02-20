'use strict'
const logger = require('../libs/logger')

const sourceDb = require('./sourceDb')
const SourceUsers = require('./SourceUsers')

const targetDb = require('../libs/db')
const TargetUsers = require('../models/Users')

const rowsPerPage = 10

// running
const run = async () => {
    try {
        await sourceDb.sync({ force: false })
        await targetDb.sync({ force: false })

        let counter = 0
        let page = 0
        while (true) {
            // select source
            const query = {
                order: [['createdAt', 'ASC']],
                offset: page * rowsPerPage,
                limit: rowsPerPage
            }
            await SourceUsers.count(query)
            const items = await SourceUsers.findAll(query)
            if (items.length <= 0)
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
