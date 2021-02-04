'use strict'
const schemas = require('../schemas')

describe("testing Profiles schema", () => {

    test("create: ok", () => {
        const json = {
            uid: 0,
            name: 'John Doe'
        }
        const result = schemas.createProfile(json)
        expect(result).toBe(true)
    })

    test("create: fail, too short name", () => {
        const json = {
            uid: 0,
            name: ''
        }
        const result = schemas.createProfile(json)
        expect(result).toBe(false)
    })

    test("create: fail, missing name", () => {
        const json = {
            uid: 0
        }
        const result = schemas.createProfile(json)
        expect(result).toBe(false)
    })

    // ----------------------------------------------------------------------

    test("update: ok", () => {
        const json = {
            name: 'John Doe'
        }
        const result = schemas.updateProfile(json)
        expect(result).toBe(true)
    })

    test("update: fail, too short username", () => {
        const json = {
            name: ''
        }
        const result = schemas.updateProfile(json)
        expect(result).toBe(false)
    })

})
