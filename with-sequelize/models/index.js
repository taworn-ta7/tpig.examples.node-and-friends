'use strict'
const Users = require('./Users')
const Profiles = require('./Profiles')
const Items = require('./Items')

Users.hasMany(Profiles, { foreignKey: 'uid' })
Profiles.belongsTo(Users, { foreignKey: 'uid' })

Profiles.hasMany(Items, { foreignKey: 'pid' })
Items.belongsTo(Profiles, { foreignKey: 'pid' })

module.exports = {
    Users,
    Profiles,
    Items
}
