'use strict'
const fs = require('fs')
const mkdirp = require('mkdirp')
const models = require('./models')
const { JsonSchemaManager, JsonSchema7Strategy, OpenApi3Strategy } = require('@alt3/sequelize-to-json-schemas')
const schemaManager = new JsonSchemaManager({
    baseUri: 'https://node-and-friends/with-sequelize/',
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
console.log(`output to ${__dirname}/outputs`)
mkdirp(`${__dirname}/outputs`).then((dir) => {
    save(schemaManager, strategy, models.Users, `${__dirname}/outputs/Users.json`)
    save(schemaManager, strategy, models.Profiles, `${__dirname}/outputs/Profiles.json`)
    save(schemaManager, strategy, models.Items, `${__dirname}/outputs/Items.json`)
})
