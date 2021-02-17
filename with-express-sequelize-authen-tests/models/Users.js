'use strict'
const { DataTypes } = require('sequelize')
const db = require('../libs/db')

module.exports = db.define('Users', {
    id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        validate: {
            isUUID: 4
        }
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    displayName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'display_name'
    }
}, {
    tableName: 'with-express-sequelize-authen-tests-users'
})
