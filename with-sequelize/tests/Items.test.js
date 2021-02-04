'use strict'
const schemas = require('../schemas')

describe("testing Items schema", () => {

    test("create: ok", () => {
        const json = {
            name: "John Doe"
        }
        const result = schemas.createItem(json)
        expect(result).toBe(true)
    })

    test("create: fail, name too short", () => {
        const json = {
            name: ""
        }
        const result = schemas.createItem(json)
        expect(result).toBe(false)
    })

    // ----------------------------------------------------------------------

    test("update: ok", () => {
        const json = {
            name: "John Doe"
        }
        const result = schemas.updateItem(json)
        expect(result).toBe(true)
    })

    test("update: fail, name too short", () => {
        const json = {
            name: ""
        }
        const result = schemas.updateItem(json)
        expect(result).toBe(false)
    })

})
