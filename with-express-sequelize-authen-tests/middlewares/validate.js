'use strict'
const { validationResult } = require('express-validator')
const RestError = require('../libs/RestError')

const checkBodyJson = (path, schema) => {
    return (req, res, next) => {
        if (!schema(req.body[path]))
            throw new RestError(schema.errors, 400)
        next()
        return true
    }
}

const json = (chain, schema) =>
    chain
        .exists()
        .custom((value, { req, location, path }) => {
            if (!schema(value))
                throw new RestError(schema.errors, 400)
            return true
        })

const id = (chain) =>
    chain
        .exists()
        .trim()
        .isInt({ min: 1 })
        .toInt()

const ids = (chain) =>
    chain
        .exists()
        .trim()
        .isString()
        .notEmpty()

const int = (chain) =>
    chain
        .exists()
        .trim()
        .isInt()
        .toInt()

const positive = (chain) =>
    chain
        .exists()
        .trim()
        .isInt({ min: 1 })
        .toInt()

const positiveOrZero = (chain) =>
    chain
        .exists()
        .trim()
        .isInt({ min: 0 })
        .toInt()

const negative = (chain) =>
    chain
        .exists()
        .trim()
        .isInt({ max: -1 })
        .toInt()

const negativeOrZero = (chain) =>
    chain
        .exists()
        .trim()
        .isInt({ max: 0 })
        .toInt()

const result = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        throw new RestError(errors.array(), 400)
    next()
}

module.exports = {
    checkBodyJson,
    json,
    id,
    ids,
    int,
    positive,
    positiveOrZero,
    negative,
    negativeOrZero,
    result
}
