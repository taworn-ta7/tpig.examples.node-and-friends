'use strict'
const { validationResult } = require('express-validator')
const RestError = require('../libs/RestError')

const checkResult = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        throw new RestError(JSON.stringify(errors.array()), 400)
}

const int = (chain) =>
    chain
        .trim()
        .isInt()
        .toInt()

const id = (chain) =>
    chain
        .trim()
        .isInt({ min: 1 })
        .toInt()

module.exports = {
    checkResult,
    int,
    id
}
