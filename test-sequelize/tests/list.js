'use strict'
const { Op } = require("sequelize")
const logger = require('../libs/logger')
const models = require('../models')

module.exports = async () => {
    logger.verbose(`==================================================`)
    logger.verbose(`test list`)

    const items0 = await models.Users.findAll({
        include: [
            {
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })
    logger.verbose(`show all records`)
    logger.verbose(`items0 = ${JSON.stringify(items0, null, 4)}`)

    const items1 = await models.Users.findAll({
        where: {
            id: { [Op.gt]: 0 }
        },
        include: [
            {
                where: {
                    name: ['Foo', 'Bar']
                },
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })
    logger.verbose(`show Profiles.name = 'Foo' or 'Bar'`)
    logger.verbose(`items1 = ${JSON.stringify(items1, null, 4)}`)

    const items2 = await models.Users.findAll({
        where: {
            id: { [Op.gt]: 0 }
        },
        include: [
            {
                association: models.Users.Profiles,
                required: true,
                include: [
                    {
                        where: {
                            name: { [Op.like]: '%Final%' }
                        },
                        association: models.Profiles.Items
                    }
                ]
            }
        ]
    })
    logger.verbose(`show Items.name LIKE '%Final%'`)
    logger.verbose(`items2 = ${JSON.stringify(items2, null, 4)}`)

    logger.verbose(`--------------------------------------------------`)
}
