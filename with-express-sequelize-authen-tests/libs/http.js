'use strict'
const fetch = require('node-fetch')
const logger = require('./logger')
const RestError = require('./RestError')

const jsonHeaders = (token) => {
    const headers = {
        'Content-Type': 'application/json;charset=utf-8'
    }
    if (token) {
        headers.Authorization = `Bearer ${token}`
    }
    return headers
}

/*
 * jsonOptions
 * - input:
 *   0: one line
 *   1: multiline
 * - output: 
 *   0: one line
 *   1: multiline
 */
const json = async (uri, options, jsonOptions) => {
    logger.info(`fetch: ${uri}`)
    if (jsonOptions && jsonOptions.input) {
        const style = Number(jsonOptions.input)
        if (style === 0)
            logger.verbose(`options: ${JSON.stringify(options)}`)
        else if (style === 1)
            logger.verbose(`options: ${JSON.stringify(options, null, 4)}`)
    }
    const response = await fetch(uri, options)
    const result = await response.json()
    if (jsonOptions && jsonOptions.output) {
        const style = Number(jsonOptions.output)
        if (style === 0)
            logger.verbose(`result: ${JSON.stringify(result)}`)
        else if (style === 1)
            logger.verbose(`result: ${JSON.stringify(result, null, 4)}`)
    }
    return result
}

const text = async (uri, options, jsonOptions) => {
    logger.info(`fetch: ${uri}`)
    if (jsonOptions && jsonOptions.input) {
        const style = Number(jsonOptions.input)
        if (style === 0)
            logger.verbose(`options: ${JSON.stringify(options)}`)
        else if (style === 1)
            logger.verbose(`options: ${JSON.stringify(options, null, 4)}`)
    }
    const response = await fetch(uri, options)
    const result = await response.text()
    if (jsonOptions && jsonOptions.output) {
        logger.verbose(`result: ${result}`)
    }
    return result
}

const handleErrors = (result, item) => {
    if (typeof result !== 'object' || !result)
        throw new RestError(`not JSON`)
    if (result.error)
        throw new RestError(result.error.message, result.error.status)
    return result
}

module.exports = {
    jsonHeaders,
    json,
    text,
    handleErrors
}
