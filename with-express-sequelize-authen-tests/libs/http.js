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
 * - outputResult: 
 *   0: no output
 *   1: one line
 *   >= 2: more lines, with specify indents
 *   NaN: no output
 */
const json = async (uri, options, jsonOptions) => {
    logger.info(`fetch: ${uri}`)
    const response = await fetch(uri, options)
    const result = await response.json()

    if (jsonOptions) {
        if (jsonOptions.outputResult) {
            const style = Number(jsonOptions.outputResult)
            if (style === 1)
                logger.verbose(`result: ${JSON.stringify(result)}`)
            else if (style >= 2)
                logger.verbose(`result: ${JSON.stringify(result, null, style)}`)
        }
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
    handleErrors
}
