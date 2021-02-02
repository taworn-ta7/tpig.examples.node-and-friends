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

    test("create: ok with children", () => {
        const json = {
            id: 0,
            username: 'john',
            password: 'password',
            profiles: [
                {
                    id: 0,
                    uid: 0,
                    name: 'John Doe',
                    items: [
                        {
                            id: 0,
                            uid: 0,
                            name: 'Dragon Quest'
                        }
                    ]
                }
            ]
        }
        const result = schemas.Users(json)
        expect(result).toBe(true)
    })

    test("create: failed because username is less than minLength", () => {
        const json = {
            id: 0,
            username: 'jo',
            password: 'password'
        }
        const result = schemas.Users(json)
        expect(result).toBe(false)
    })

    test("create: failed because mistype username", () => {
        const json = {
            id: 0,
            usernam_: 'john',
            password: 'password'
        }
        const result = schemas.Users(json)
        expect(result).toBe(false)
    })

    test("create: failed because no password", () => {
        const json = {
            id: 0,
            username: 'john'
        }
        const result = schemas.Users(json)
        expect(result).toBe(false)
    })

    test("create: failed with children", () => {
        const json = {
            id: 0,
            username: 'john',
            password: 'password',
            profiles: [
                {
                    id: 0,
                    uid: 0,
                    name: 'John Doe',
                    items: [
                        {
                            id: 0,
                            uid: 0,
                            name: ''
                        }
                    ]
                }
            ]
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

    test("update: ok, even no update", () => {
        const json = {
            id: 1
        }
        const result = schemas.Users(json)
        expect(result).toBe(true)
    })

    test("update: failed because username is less than minLength", () => {
        const json = {
            id: 1,
            username: 'jo'
        }
        const result = schemas.Users(json)
        expect(result).toBe(false)
    })

    test("unknown: failed because no id", () => {
        const json = {
            username: 'john',
            username: 'password'
        }
        const result = schemas.Users(json)
        expect(result).toBe(false)
    })

})
