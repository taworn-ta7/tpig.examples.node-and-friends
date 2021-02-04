'use strict'
const schemas = require('../schemas')

describe("testing Users schema", () => {

    test("create: ok", () => {
        const json = {
            username: 'john',
            password: 'password'
        }
        const result = schemas.createUser(json)
        expect(result).toBe(true)
    })

    test("create: fail, too short username", () => {
        const json = {
            username: 'jo',
            password: 'password'
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    test("create: fail, missing password", () => {
        const json = {
            username: 'john'
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    // ----------------------------------------------------------------------

    test("update: ok", () => {
        const json = {
            username: 'john',
            password: 'password'
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(true)
    })

    test("update: ok, update username", () => {
        const json = {
            username: 'john'
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(true)
    })

    test("update: ok, update password", () => {
        const json = {
            password: 'password'
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(true)
    })

    test("update: fail, too short username", () => {
        const json = {
            username: 'jo'
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(false)
    })

    test("update: fail, too short password", () => {
        const json = {
            password: 'pass'
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(false)
    })

})
