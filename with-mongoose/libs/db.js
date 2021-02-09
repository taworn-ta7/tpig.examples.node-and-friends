'use strict'
const mongoose = require('mongoose')
const config = require('../configs')

const host = config.get('mongo:host')
const username = config.get('mongo:username')
const password = config.get('mongo:password')
const database = config.get('mongo:database')
const url = `mongodb://${host}/${database}`
mongoose.connect(url, {
    // user: username,
    // pass: password,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

module.exports = mongoose
