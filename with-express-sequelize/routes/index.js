'use strict'
const router = require('express').Router()

router.use('/tests', require('./tests'))

module.exports = router
