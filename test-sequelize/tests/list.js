'use strict'
const { Op } = require("sequelize")
const logger = require('../libs/logger')
const models = require('../models')

module.exports = async () => {
    logger.verbose(`==================================================`)
    logger.verbose(`test list`)

    const items = await models.Users.findAll({
        where: {
            id: { [Op.gt]: 0 }
        },
        include: [
            {
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })
    logger.verbose(`items = ${JSON.stringify(items, null, 4)}`)

    const partialItems = await models.Users.findAll({
        where: {
            id: { [Op.gt]: 0 }
        },
        include: [
            {
                where: {
                    name: { [Op.like]: '%John%' }
                },
                association: models.Users.Profiles,
                include: [models.Profiles.Items]
            }
        ]
    })
    logger.verbose(`partialItems = ${JSON.stringify(partialItems, null, 4)}`)

    logger.verbose(`--------------------------------------------------`)
}
