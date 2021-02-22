'use strict'
const db = require('../libs/db')

const schema = new db.Schema({
    username: String,
    displayName: String,
    role: String,
    disabled: Number,
    unregistered: Number,
    begin: Date,
    end: Date,
    expire: Date,
    salt: String,
    hash: String,
    token: String
})

module.exports = db.model('with-express-mongoose-authen-users', schema)
