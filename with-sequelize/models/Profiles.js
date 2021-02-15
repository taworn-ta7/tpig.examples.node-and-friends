'use strict'
const { DataTypes } = require('sequelize')
const db = require('../libs/db')

module.exports = db.define('Profiles', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            min: 0
        }
    },
    uid: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    }
}, {
    tableName: 'with-sequelize-profiles'
})
