'use strict'
const schemas = require('../schemas')

describe("testing Users schema", () => {

    test("create: ok", () => {
        const json = {
            username: "john",
            displayName: "John Doe",
            disabled: false,
            password: "password",
            confirmPassword: "password"
        }
        const result = schemas.createUser(json)
        expect(result).toBe(true)
    })

    test("create: ok, omit disabled", () => {
        const json = {
            username: "john",
            displayName: "John Doe",
            password: "password",
            confirmPassword: "password"
        }
        const result = schemas.createUser(json)
        expect(result).toBe(true)
    })

    test("create: fail, displayName missing", () => {
        const json = {
            username: "john",
            password: "password",
            confirmPassword: "password"
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    test("create: fail, displayName misspelling", () => {
        const json = {
            username: "john",
            displayname: "John Doe",
            password: "password",
            confirmPassword: "password"
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

    test("update: fail, displayName too short", () => {
        const json = {
            displayName: "0"
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(false)
    })

})
