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
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isUUID: 4
        }
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            len: [1, 100]
        }
    }
}, {
    name: {
        singular: 'profile',
        plural: 'profiles'
    },
    tableName: 'with-express-sequelize-authen-profiles'
})
