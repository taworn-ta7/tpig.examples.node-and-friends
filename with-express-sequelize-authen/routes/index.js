'use strict'
const router = require('express').Router()

router.use('/authen', require('./authen'))
router.use('/user', require('./user'))
router.use('/games', require('./games'))

module.exports = router
