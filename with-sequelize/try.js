'use strict'
const schemas = require('./schemas')

const json = {
    id: 0,
    username: 'john',
    password: 'password'
}
const result = schemas.Users(json)
console.log(`result: ${JSON.stringify(result, null, 4)}`)
