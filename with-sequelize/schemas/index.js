'use strict'
const metaSchema = require('ajv/lib/refs/json-schema-draft-07.json')
const Ajv = require('ajv')

const ajv = new Ajv({
    metaSchema,
    schemas: [
        require('./Users.json'),
        require('./Profiles.json'),
        require('./Items.json')
    ]
})

const Users = ajv.compile({ "$ref": "https://node-and-friends/with-sequelize/Users.json#/definitions/user" })
const Profiles = ajv.compile({ "$ref": "https://node-and-friends/with-sequelize/Profiles.json#/definitions/profile" })
const Items = ajv.compile({ "$ref": "https://node-and-friends/with-sequelize/Items.json#/definitions/item" })

module.exports = {
    Users,
    Profiles,
    Items
}
