'use strict'
const Ajv = require('ajv').default
const ajv = new Ajv({
    metaSchema: require('ajv/lib/refs/json-schema-draft-07.json'),
    schemas: [
        require('./Users.json')
    ]
})

const addFormats = require('ajv-formats')
addFormats(ajv)

const baseUri = 'https://node-and-friends/with-express-mongoose-authen/'
module.exports = {
    createUser: ajv.compile({ '$ref': `${baseUri}Users.json#/definitions/createUser` }),
    updateUser: ajv.compile({ '$ref': `${baseUri}Users.json#/definitions/updateUser` })
}
