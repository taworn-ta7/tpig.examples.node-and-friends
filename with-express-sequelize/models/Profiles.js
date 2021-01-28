'use strict'
const { DataTypes } = require('sequelize')
const db = require('../libs/db')

module.exports = db.define('Profiles', {
    id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
    uid: { type: DataTypes.BIGINT, allowNull: false },
    name: { type: DataTypes.STRING(100), allowNull: false }
}, {
    tableName: 'profiles'
})
