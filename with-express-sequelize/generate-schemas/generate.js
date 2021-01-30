'use strict'
const fs = require('fs')
const models = require('../models')
const { JsonSchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('@alt3/sequelize-to-json-schemas')
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
const strategy = new JsonSchema7Strategy()
//const strategy = new OpenApi3Strategy()
save(schemaManager, strategy, models.Users, 'outputs/Users.json')
save(schemaManager, strategy, models.Profiles, 'outputs/Profiles.json')
save(schemaManager, strategy, models.Items, 'outputs/Items.json')
