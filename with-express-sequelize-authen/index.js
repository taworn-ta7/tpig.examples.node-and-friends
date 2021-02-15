'use strict'
const express = require('express')
const app = express()
const cors = require('cors')
const uuid = require('uuid')
const config = require('./configs')
const { logger, db } = require('./libs')
require('./models')

// add log
app.use((req, res, next) => {
    req.id = uuid.v4()
    logger.info(`${req.id} ${req.method} ${req.originalUrl}`)
    next()
})

// add modules
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('pub'))
app.use(cors())

// add routes
app.use('/api', require('./routes'))

// add error handling
app.use((err, req, res, next) => {
    logger.error(`${req.id} ${err.stack}`)
    let code = err.status || 500
    res.status(code).json({
        error: {
            status: code,
            message: err.message,
            data: err.data,
            ref: req.id
        }
    }).send()
})

// running
const run = async () => {
    try {
        logger.verbose(`express + sequelize + authen`)

        await db.sync({ force: false })

        const port = config.get('port')
        app.listen(port, () => logger.info(`with-express-sequelize-authen server listening on port ${port}`))
    }
    catch (ex) {
        logger.error(ex)
    }
}
run()
