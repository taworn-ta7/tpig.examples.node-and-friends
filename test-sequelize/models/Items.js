'use strict'
const { DataTypes } = require('sequelize')
const db = require('../libs/db')

module.exports = db.define('Items', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    pid: { type: DataTypes.BIGINT, allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false }
}, {
    tableName: 'items'
})
