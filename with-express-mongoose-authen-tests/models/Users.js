'use strict'
const db = require('../libs/db')

const schema = new db.Schema({
    id: String,
    username: String,
    displayName: String
})

module.exports = db.model('with-express-mongoose-authen-tests-users', schema)
