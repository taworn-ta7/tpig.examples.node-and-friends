'use strict'
const Ajv = require('ajv').default
const ajv = new Ajv({
    metaSchema: require('ajv/lib/refs/json-schema-draft-07.json'),
    schemas: [
        require('./Users.json'),
        require('./Profiles.json'),
        require('./Items.json')
    ]
})

const baseUri = 'https://node-and-friends/with-sequelize/'
module.exports = {
    Users: ajv.compile({ '$ref': `${baseUri}Users.json#/definitions/user` }),
    Profiles: ajv.compile({ '$ref': `${baseUri}Profiles.json#/definitions/profile` }),
    Items: ajv.compile({ '$ref': `${baseUri}Items.json#/definitions/item` })
}
