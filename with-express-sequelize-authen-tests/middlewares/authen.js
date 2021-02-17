'use strict'
const fetch = require('node-fetch')
const config = require('../configs')
const RestError = require('../libs/RestError')
const models = require('../models')

const authenUri = config.get('authenUri')

const login = (username, password) => {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            login: {
                username,
                password
            }
        })
    }
    return fetch(`${authenUri}api/authen/login`, options)
}

const logout = (token) => {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(`${authenUri}api/authen/logout`, options)
}

const check = (token) => {
    var options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            'Authorization': 'Bearer ' + token
        }
    }
    return fetch(`${authenUri}api/authen/check`, options)
}

module.exports = {
    login,
    logout,
    check,
}
