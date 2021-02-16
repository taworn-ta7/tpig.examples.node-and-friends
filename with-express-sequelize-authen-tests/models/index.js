'use strict'
const Users = require('./Users')
const Profiles = require('./Profiles')
const Items = require('./Items')

Profiles.Items = Profiles.hasMany(Items, { as: 'items', foreignKey: 'pid' })
Items.Profiles = Items.belongsTo(Profiles, { foreignKey: 'pid' })

module.exports = {
    Users,
    Profiles,
    Items
}
