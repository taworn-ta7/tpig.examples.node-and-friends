'use strict'
const metaSchema = require('ajv/lib/refs/json-schema-draft-07.json')
const Ajv = require('ajv').default

const ajv = new Ajv({
    metaSchema,
    schemas: [
        require('./Users.json'),
        require('./Profiles.json'),
        require('./Items.json')
        /*
        require('./allSchemas.json')
        */
    ]
})

const baseUri = 'https://node-and-friends/with-sequelize'
const Users = ajv.compile({ '$ref': `${baseUri}/Users.json#/definitions/user` })
const Profiles = ajv.compile({ '$ref': `${baseUri}/Profiles.json#/definitions/profile` })
const Items = ajv.compile({ '$ref': `${baseUri}/Items.json#/definitions/item` })

module.exports = {
    Users,
    Profiles,
    Items
}
