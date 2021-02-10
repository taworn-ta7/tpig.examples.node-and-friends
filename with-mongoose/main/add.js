'use strict'
const logger = require('../libs/logger')
const models = require('../models')

module.exports = async () => {
    logger.verbose(`==================================================`)
    logger.verbose(`test add`)

    // delete all left
    await models.Users.deleteMany()

    // create first data
    const user0 = new models.Users({
        username: 'john',
        password: 'password',
        profiles: [
            {
                name: 'John Doe',
                items: [
                    { name: 'Final Fantasy I' },
                    { name: 'Final Fantasy II' },
                    { name: 'Final Fantasy III' }
                ]
            },
            {
                name: 'John Smith',
                items: [
                    { name: 'Dragon Quest IV' },
                    { name: 'Dragon Quest V' }
                ]
            }
        ]
    })
    await user0.save()

    // create second data
    const user1 = new models.Users({
        username: 'Bard',
        password: '--------',
        profiles: [
            {
                name: 'Foo',
                items: [
                    { name: 'Area 88' },
                    { name: 'Konami Wai Wai World' },
                    { name: 'Castlevania' }
                ]
            },
            {
                name: 'Bar'
            }
        ]
    })
    await user1.save()

    logger.verbose(`--------------------------------------------------`)
}
