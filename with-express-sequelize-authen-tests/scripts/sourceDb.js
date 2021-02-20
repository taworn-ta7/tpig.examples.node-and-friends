'use strict'
const { Sequelize } = require('sequelize')

const host = 'localhost'
const username = 'user'
const password = 'user//pass'
const database = 'node_and_friends'
const sequelize = new Sequelize(database, username, password, {
    host,
    dialect: 'mysql',
    logging: false
})

module.exports = sequelize
