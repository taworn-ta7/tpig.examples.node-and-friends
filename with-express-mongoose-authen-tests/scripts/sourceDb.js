'use strict'
const mongoose = require('mongoose')

const host = 'localhost:27017'
const username = 'user'
const password = 'user//pass'
const database = 'node_and_friends'
const url = `mongodb://${host}/${database}`

mongoose.connect(url, {
    // user: username,
    // pass: password,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose
