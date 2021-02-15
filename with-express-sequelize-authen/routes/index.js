'use strict'
const router = require('express').Router()

router.use('/authen', require('./authen'))
router.use('/admin', require('./admin'))
router.use('/user', require('./user'))

module.exports = router
