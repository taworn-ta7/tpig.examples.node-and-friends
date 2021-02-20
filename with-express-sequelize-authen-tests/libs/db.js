'use strict'
const { Sequelize } = require('sequelize')
const config = require('../configs')

const host = config.get('mysql:host')
const username = config.get('mysql:username')
const password = config.get('mysql:password')
const database = config.get('mysql:database')
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
    logging: config.get('db:logging', false)
})

module.exports = sequelize
