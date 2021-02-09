'use strict'
const db = require('../libs/db')

module.exports = new db.Schema({
    username: String,
    password: String
})
