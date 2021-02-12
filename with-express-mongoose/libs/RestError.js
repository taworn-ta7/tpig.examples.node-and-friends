'use strict'

class RestError extends Error {
    constructor(message, status = undefined) {
        super(message)
        this.name = "RestError"
        this.status = status
        if (typeof message !== 'string')
            this.error = message
    }
}

module.exports = RestError
