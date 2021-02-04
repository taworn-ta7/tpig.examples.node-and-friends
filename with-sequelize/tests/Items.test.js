'use strict'
const schemas = require('../schemas')

describe("testing Items schema", () => {

    test("create: ok", () => {
        const json = {
            uid: 0,
            name: 'John Doe'
        }
        const result = schemas.createItem(json)
        expect(result).toBe(true)
    })

    test("create: fail, too short name", () => {
        const json = {
            uid: 0,
            name: ''
        }
        const result = schemas.createItem(json)
        expect(result).toBe(false)
    })

    test("create: fail, missing name", () => {
        const json = {
            uid: 0
        }
        const result = schemas.createItem(json)
        expect(result).toBe(false)
    })

    // ----------------------------------------------------------------------

    test("update: ok", () => {
        const json = {
            name: 'John Doe'
        }
        const result = schemas.updateItem(json)
        expect(result).toBe(true)
    })

    test("update: fail, too short username", () => {
        const json = {
            name: ''
        }
        const result = schemas.updateItem(json)
        expect(result).toBe(false)
    })

})
