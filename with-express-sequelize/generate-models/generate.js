'use strict'
const models = require('../models')
const { JsonSchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('@alt3/sequelize-to-json-schemas')
const schemaManager = new JsonSchemaManager({
    baseUri: '/with-express-sequelize/',
    absolutePaths: true,
    secureSchemaUri: true
});

// now generate a JSON Schema Draft-07 model schema
const jsonSchema7Strategy = new JsonSchema7Strategy()
let schema0
console.log('Schema #0')
schema0 = schemaManager.generate(models.Users, jsonSchema7Strategy)
console.log(JSON.stringify(schema0, null, 4))
schema0 = schemaManager.generate(models.Profiles, jsonSchema7Strategy)
console.log(JSON.stringify(schema0, null, 4))
schema0 = schemaManager.generate(models.Items, jsonSchema7Strategy)
console.log(JSON.stringify(schema0, null, 4))

// and/or the OpenAPI 3.0 equivalent
const schema1 = schemaManager.generate(models.Users, new OpenApi3Strategy())
console.log('Schema #1')
console.log(JSON.stringify(schema1, null, 4))
