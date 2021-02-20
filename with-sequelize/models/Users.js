'use strict'
const { DataTypes } = require('sequelize')
const db = require('../libs/db')

module.exports = db.define('Users', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            min: 0
        }
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            len: 4
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: 8
        }
    }
}, {
    name: {
        singular: 'user',
        plural: 'users'
    },
    tableName: 'with-sequelize-users'
})
