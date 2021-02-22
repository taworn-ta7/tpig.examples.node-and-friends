'use strict'
const schemas = require('../schemas')

describe("testing Profiles schema", () => {

    test("create: ok", () => {
        const json = {
            uid: '00000000-1111-2222-3333-444444444444',
            name: "John Doe"
        }
        const result = schemas.createProfile(json)
        expect(result).toBe(true)
    })

    test("create: fail, name too short", () => {
        const json = {
            uid: '00000000-1111-2222-3333-444444444444',
            name: ""
        }
        const result = schemas.createProfile(json)
        expect(result).toBe(false)
    })

    // ----------------------------------------------------------------------

    test("create with children: ok", () => {
        const json = {
            uid: '00000000-1111-2222-3333-444444444444',
            name: "John Doe",
            items: [
                { name: "Final Fantasy I" },
                { name: "Final Fantasy II" },
                { name: "Final Fantasy III" }
            ]
        }
        const result = schemas.createProfile(json)
        expect(result).toBe(true)
    })

    test("create with children: fail, name too short", () => {
        const json = {
            uid: '00000000-1111-2222-3333-444444444444',
            name: "John Smith",
            items: [
                { name: "Dragon Quest IV" },
                { name: "" }
            ]
        }
        const result = schemas.createProfile(json)
        expect(result).toBe(false)
    })

    // ----------------------------------------------------------------------

    test("update: ok", () => {
        const json = {
            uid: '00000000-1111-2222-3333-444444444444',
            name: "John Doe"
        }
        const result = schemas.updateProfile(json)
        expect(result).toBe(true)
    })

    test("update: fail, name too short", () => {
        const json = {
            uid: '00000000-1111-2222-3333-444444444444',
            name: ""
        }
        const result = schemas.updateProfile(json)
        expect(result).toBe(false)
    })

})
