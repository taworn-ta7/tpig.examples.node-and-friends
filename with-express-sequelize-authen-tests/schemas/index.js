'use strict'
const Ajv = require('ajv').default
const ajv = new Ajv({
    metaSchema: require('ajv/lib/refs/json-schema-draft-07.json'),
    schemas: [
        require('./Profiles.json'),
        require('./Items.json')
    ],
    $data: true
})

const addFormats = require('ajv-formats')
addFormats(ajv)

const baseUri = 'https://node-and-friends/with-express-sequelize-authen-tests/'
module.exports = {
    createProfile: ajv.compile({ '$ref': `${baseUri}Profiles.json#/definitions/createProfile` }),
    updateProfile: ajv.compile({ '$ref': `${baseUri}Profiles.json#/definitions/updateProfile` }),
    createItem: ajv.compile({ '$ref': `${baseUri}Items.json#/definitions/createItem` }),
    updateItem: ajv.compile({ '$ref': `${baseUri}Items.json#/definitions/updateItem` })
}
