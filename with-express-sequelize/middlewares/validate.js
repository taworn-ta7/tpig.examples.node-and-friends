'use strict'
const { validationResult } = require('express-validator')
const RestError = require('../libs/RestError')

const result = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        throw new RestError(JSON.stringify(errors.array()), 400)
    next()
}

const id = (chain) =>
    chain
        .trim()
        .isInt({ min: 1 })
        .toInt()

const int = (chain) =>
    chain
        .trim()
        .isInt()
        .toInt()

const positive = (chain) =>
    chain
        .trim()
        .isInt({ min: 1 })
        .toInt()

const positiveOrZero = (chain) =>
    chain
        .trim()
        .isInt({ min: 0 })
        .toInt()

const negative = (chain) =>
    chain
        .trim()
        .isInt({ max: -1 })
        .toInt()

const negativeOrZero = (chain) =>
    chain
        .trim()
        .isInt({ max: 0 })
        .toInt()

const json = (schema, json) => {
    if (!schema(json))
        throw new RestError(JSON.stringify(schema.errors), 400)
    return json
}

module.exports = {
    result,
    id,
    int,
    positive,
    positiveOrZero,
    negative,
    negativeOrZero,
    json
}
