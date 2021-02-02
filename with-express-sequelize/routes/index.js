'use strict'
const router = require('express').Router()

router.use('/tests', require('./tests'))
router.use('/games', require('./games'))

module.exports = router
