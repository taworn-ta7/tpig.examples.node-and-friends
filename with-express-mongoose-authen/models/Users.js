'use strict'
const db = require('../libs/db')

const schema = new db.Schema({
    username: String,
    password: String,
    profiles: [
        {
            name: String,
            items: [
                {
                    name: String
                }
            ]
        }
    ]
})

module.exports = db.model('with-express-mongoose-authen-users', schema)
