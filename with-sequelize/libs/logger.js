'use strict'
const { createLogger, format, transports } = require('winston')
const fs = require('fs')
require('winston-daily-rotate-file')

const logDir = 'logs'
if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const logger = createLogger({
    level: (process.env.NODE_ENV || 'development') === 'production' ? 'debug' : 'silly',  // change log level output
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(info => `${info.timestamp} ${info.level.substring(0, 3).toUpperCase()} ${info.message}`)
    ),
    transports: [
        new transports.Console({
        }),
        new transports.DailyRotateFile({
            filename: `${logDir}/%DATE%.log`,
            datePattern: 'YYYYMMDD'
        })
    ]
})

module.exports = logger
