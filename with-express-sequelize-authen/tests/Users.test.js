'use strict'
const schemas = require('../schemas')

describe("testing Users schema", () => {

    test("create: ok", () => {
        const json = {
            username: "john",
            displayName: "John Doe",
            role: "admin",
            disabled: false
        }
        const result = schemas.createUser(json)
        expect(result).toBe(true)
    })

    test("create: ok, omit disabled", () => {
        const json = {
            username: "john",
            displayName: "John Doe",
            role: "user"
        }
        const result = schemas.createUser(json)
        expect(result).toBe(true)
    })

    test("create: fail, displayName missing", () => {
        const json = {
            username: "john",
            role: "user"
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    test("create: fail, role misspelling", () => {
        const json = {
            username: "john",
            displayName: "John Doe",
            role: "USER"
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    // ----------------------------------------------------------------------

    test("update: ok", () => {
        const json = {
            displayName: "Noname"
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(true)
    })

    test("update: fail, role misspelling", () => {
        const json = {
            role: "admiN"
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(false)
    })

})
