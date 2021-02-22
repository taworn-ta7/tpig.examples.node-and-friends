'use strict'
const db = require('../libs/db')

const schema = new db.Schema({
    uid: String,
    name: String,
    items: [
        {
            name: String
        }
    ]
})

module.exports = db.model('with-express-mongoose-authen-tests-profiles', schema)
