'use strict'

class RestError extends Error {
    constructor(messageOrData, status = undefined) {
        if (typeof messageOrData === 'string') {
            super(messageOrData)
            this.data = null
        }
        else {
            super(JSON.stringify(messageOrData))
            this.data = messageOrData
        }
        this.name = "RestError"
        this.status = status
    }
}

module.exports = RestError
