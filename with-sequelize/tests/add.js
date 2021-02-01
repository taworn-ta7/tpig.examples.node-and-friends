'use strict'
const logger = require('../libs/logger')
const models = require('../models')

module.exports = async () => {
    logger.verbose(`==================================================`)
    logger.verbose(`test add`)

    await models.Users.create({
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
    }, {
        include: [
            {
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })

    await models.Users.create({
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
    }, {
        include: [
            {
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })

    logger.verbose(`--------------------------------------------------`)
}
