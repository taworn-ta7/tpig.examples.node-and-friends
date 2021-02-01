'use strict'
const schemas = require('../schemas')

describe("testing Users schema", () => {

    test("create: ok", () => {
        const json = {
            id: 0,
            username: 'john',
            password: 'password'
        }
        const result = schemas.Users(json)
        expect(result).toBe(true)
    })

    test("create: failed because no password", () => {
        const json = {
            id: 0,
            username: 'john'
        }
        const result = schemas.Users(json)
        expect(result).toBe(false)
    })

    test("update: ok, update both", () => {
        const json = {
            id: 1,
            username: 'john',
            password: 'password'
        }
        const result = schemas.Users(json)
        expect(result).toBe(true)
    })

    test("update: ok, update username", () => {
        const json = {
            id: 1,
            username: 'john'
        }
        const result = schemas.Users(json)
        expect(result).toBe(true)
    })

})
