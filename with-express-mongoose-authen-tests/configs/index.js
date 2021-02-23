'use strict'
const path = require('path')
const Config = require('merge-config')
const config = new Config()

config.file(path.join(__dirname, 'config.yaml'))

if (process.env.NODE_ENV === 'production') {
    config.file(path.join(__dirname, 'config.production.yaml'))
    config.set('DEBUG', false)
}
else if (process.env.NODE_ENV === 'development') {
    config.file(path.join(__dirname, 'config.development.yaml'))
    config.set('DEBUG', true)
}
else {
    config.set('DEBUG', true)
}

module.exports = config
