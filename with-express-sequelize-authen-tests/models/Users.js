'use strict'
const { Sequelize, DataTypes } = require('sequelize')
const db = require('../libs/db')

module.exports = db.define('Users', {
    id: {
        type: DataTypes.STRING(50),
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
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

    begin: {
        type: DataTypes.DATE,
        allowNull: true
    },
    end: {
        type: DataTypes.DATE,
        allowNull: true
    },
    expire: {
        type: DataTypes.DATE,
        allowNull: true
    },

    salt: {
        type: DataTypes.STRING,
        allowNull: false
    },
    hash: {
        type: DataTypes.STRING(1024),
        allowNull: false
    },
    token: {
        type: DataTypes.STRING(1024),
        allowNull: true
    }
}, {
    tableName: 'with-express-sequelize-authen-tests-users'
})
