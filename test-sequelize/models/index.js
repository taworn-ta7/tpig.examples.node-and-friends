'use strict'
const Users = require('./Users')
const Profiles = require('./Profiles')
const Items = require('./Items')

Users.Profiles = Users.hasMany(Profiles, { as: 'profiles', foreignKey: 'uid' })
Profiles.Users = Profiles.belongsTo(Users, { foreignKey: 'uid' })

Profiles.Items = Profiles.hasMany(Items, { as: 'items', foreignKey: 'pid' })
Items.Profiles = Items.belongsTo(Profiles, { foreignKey: 'pid' })

module.exports = {
    Users,
    Profiles,
    Items
}
