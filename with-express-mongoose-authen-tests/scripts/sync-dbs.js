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
        let counter = 0
        let page = 0
        while (true) {
            // select source
            const query = {
            }
            await SourceUsers.countDocuments(query)
            const items = await SourceUsers.find(query).skip(page * rowsPerPage).limit(rowsPerPage)
            if (items.length <= 0)
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
