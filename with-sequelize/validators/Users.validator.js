'use strict'
const Ajv = require('ajv')
const metaSchema = require('ajv/lib/refs/json-schema-draft-07.json')
const modelsSchema = require('../schemas/Users.json')

const schema = {
    "type": "object",
    "properties": {
        "game": {
            "$ref": "https://node-and-friends/with-sequelize/Users.json"
        }
    },
    "required": [
        "game"
    ]
}

const game = new Ajv({ metaSchema: metaSchema, schemas: [modelsSchema] }).compile(schema)

module.exports = {
    game
}
