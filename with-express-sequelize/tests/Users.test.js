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

    test("create: fail, username too short", () => {
        const json = {
            username: 'jo',
            password: 'password'
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    test("create: fail, password missing", () => {
        const json = {
            username: 'john'
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    // ----------------------------------------------------------------------

    test("create with children: ok", () => {
        const json = {
            username: 'john',
            password: 'password',
            profiles: [
                {
                    name: 'John Doe'
                }
            ]
        }
        const result = schemas.createUser(json)
        expect(result).toBe(true)
    })

    test("create with children: ok", () => {
        const json = {
            username: 'john',
            password: 'password',
            profiles: [
                {
                    name: 'John Doe',
                    items: [
                        { name: 'Final Fantasy I' },
                        { name: 'Final Fantasy II' },
                        { name: 'Final Fantasy III' }
                    ]
                },
                {
                    name: 'John Smith',
                    items: [
                        { name: 'Dragon Quest IV' },
                        { name: 'Dragon Quest V' }
                    ]
                }
            ]
        }
        const result = schemas.createUser(json)
        expect(result).toBe(true)
    })

    test("create with children: fail, name too short", () => {
        const json = {
            username: 'john',
            password: 'password',
            profiles: [
                {
                    name: '',
                    items: [
                        { name: 'Final Fantasy I' },
                        { name: 'Final Fantasy II' },
                        { name: 'Final Fantasy III' }
                    ]
                }
            ]
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    test("create with children: fail, name too short", () => {
        const json = {
            username: 'john',
            password: 'password',
            profiles: [
                {
                    name: 'John Smith',
                    items: [
                        { name: 'Dragon Quest IV' },
                        { name: '' }
                    ]
                }
            ]
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

    test("update: fail, username too short", () => {
        const json = {
            username: 'jo'
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(false)
    })

    test("update: fail, password too short", () => {
        const json = {
            password: 'pass'
        }
        const result = schemas.updateUser(json)
        expect(result).toBe(false)
    })

})
