'use strict'
const path = require('path')
const Config = require('merge-config')
const config = new Config()

config.file(path.join(__dirname, 'config.yaml'))
if (process.env.TESTING)
    config.file(path.join(__dirname, 'config.test.yaml'))

module.exports = config
