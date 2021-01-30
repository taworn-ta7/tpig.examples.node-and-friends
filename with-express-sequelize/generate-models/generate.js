'use strict'
const fs = require('fs')
const models = require('../models')
const { JsonSchemaManager, JsonSchema7Strategy } = require('@alt3/sequelize-to-json-schemas')
const schemaManager = new JsonSchemaManager({
    baseUri: '/with-express-sequelize/',
    absolutePaths: true,
    secureSchemaUri: true
})

// save function
const save = (manager, strategy, model, file) => {
    const schema = manager.generate(model, strategy)
    const text = JSON.stringify(schema, null, 4)
    fs.writeFileSync(file, text)
}

// now generate a JSON Schema Draft-07 model schema
const jsonSchema7Strategy = new JsonSchema7Strategy()
save(schemaManager, jsonSchema7Strategy, models.Users, 'output/User.json')
save(schemaManager, jsonSchema7Strategy, models.Profiles, 'output/Profiles.json')
save(schemaManager, jsonSchema7Strategy, models.Items, 'output/Items.json')
