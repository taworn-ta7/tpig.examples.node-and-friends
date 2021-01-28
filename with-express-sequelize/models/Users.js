'use strict'
const { DataTypes } = require('sequelize')
const db = require('../libs/db')

module.exports = db.define('Users', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING(20), allowNull: false },
    password: { type: DataTypes.TEXT, allowNull: false, defaultValue: '' }
}, {
    tableName: 'users'
})
