'use strict'
const { DataTypes } = require('sequelize')
const db = require('../libs/db')

module.exports = db.define('Users', {
    id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        validate: {
            isUUID: 4
        }
    },
    username: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
            len: 4
        }
    },
    displayName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'display_name',
        validate: {
            len: 4
        }
    },
    role: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'user',
        validate: {
            isIn: [['user', 'admin']],
        }
    },
    disabled: {
        // disabled by admin
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    unregistered: {
        // unregistered by user
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },

    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    begin: {
        type: DataTypes.DATE,
        allowNull: false
    },
    end: {
        type: DataTypes.DATE,
        allowNull: false
    },

    secret: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users'
})
