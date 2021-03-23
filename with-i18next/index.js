'use strict'
const i18next = require('i18next')
const Backend = require('i18next-fs-backend')
const path = require('path')

/**
 * Main function.
 */
const run = async () => {
    try {
        await i18next.use(Backend).init({
            fallbackLng: 'en',
            lng: 'en',
            preload: ['en'],
            ns: ['translations'],
            defaultNS: 'translations',
            backend: {
                loadPath: path.join(__dirname, 'locales', '{{lng}}', '{{ns}}.json')
            }
        })

        console.log(i18next.t("hello", { smile: ":)" }))
    }
    catch (ex) {
        console.log(ex)
        process.exit(1)
    }
}
run()
