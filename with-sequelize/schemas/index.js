'use strict'
const metaSchema = require('ajv/lib/refs/json-schema-draft-07.json')
const Ajv = require('ajv')

const ajv = new Ajv({
    metaSchema,
    schemas: [
        /*
        require('./Users.json'),
        require('./Profiles.json'),
        require('./Items.json')
        */
        require('./allSchemas.json')
    ]
})

const Users = ajv.compile({ '$ref': 'https://node-and-friends/with-sequelize/allSchemas.json#/definitions/user' })
const Profiles = ajv.compile({ '$ref': 'https://node-and-friends/with-sequelize/allSchemas.json#/definitions/profile' })
const Items = ajv.compile({ '$ref': 'https://node-and-friends/with-sequelize/allSchemas.json#/definitions/item' })

module.exports = {
    Users,
    Profiles,
    Items
}
