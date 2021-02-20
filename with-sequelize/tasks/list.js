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
                model: models.Profiles,
                include: [models.Items]
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
                model: models.Profiles,
                include: [models.Items]
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
                model: models.Profiles,
                required: true,
                include: [
                    {
                        where: {
                            name: { [Op.like]: '%Final%' }
                        },
                        model: models.Items
                    }
                ]
            }
        ]
    })
    logger.verbose(`show Items.name LIKE '%Final%'`)
    logger.verbose(`items2 = ${JSON.stringify(items2, null, 4)}`)

    logger.verbose(`--------------------------------------------------`)
}
