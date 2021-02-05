'use strict'

class RestError extends Error {
    constructor(message, status = undefined) {
        super(message)
        this.name = "RestError"
        this.status = status
    }
}

module.exports = RestError
