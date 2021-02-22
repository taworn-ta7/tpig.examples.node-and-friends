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

    test("create: fail, password mismatch", () => {
        const json = {
            username: "john",
            displayName: "John Doe",
            password: "password",
            confirmPassword: "PASSWORD"
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    test("create: fail, confirmPassword missing", () => {
        const json = {
            username: "john",
            displayName: "John Doe",
            password: "password",
            confirmPasswor_: "password"
        }
        const result = schemas.createUser(json)
        expect(result).toBe(false)
    })

    test("create: fail, confirmPassword misspelling", () => {
        const json = {
            username: "john",
            displayName: "John Doe",
            password: "password",
            confirmPassword: "_assword"
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

    // ----------------------------------------------------------------------

    test("update: ok, password", () => {
        const json = {
            displayName: "Watcher",
            password: "pAsSwOrD",
            confirmPassword: "pAsSwOrD",
        }
        const result = schemas.updateUserPassword(json)
        expect(result).toBe(true)
    })

    test("update: fail, password mismatch", () => {
        const json = {
            displayName: "Watcher",
            password: "pAsSwOrD",
            confirmPassword: "PaSsWoRd",
        }
        const result = schemas.updateUserPassword(json)
        expect(result).toBe(false)
    })

    test("update: fail, password without confirm", () => {
        const json = {
            displayName: "Watcher",
            password: "pAsSwOrD"
        }
        const result = schemas.updateUserPassword(json)
        expect(result).toBe(false)
    })

    test("update: fail, confirm without password", () => {
        const json = {
            displayName: "Watcher",
            confirmPassword: "pAsSwOrD"
        }
        const result = schemas.updateUserPassword(json)
        expect(result).toBe(false)
    })

})
