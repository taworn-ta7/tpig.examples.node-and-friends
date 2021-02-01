'use strict'
const validator = require('../validators/Users.validator')

describe("testing Users schema", () => {

    test("create, ok", () => {
        const json = {
            game: {
                'name': 'Item 0'
            }
        }
        const result = validator.create(json)
        expect(result).toBe(true)
    })

    test("create, ok with optional", () => {
        const json = {
            game: {
                'name': 'Item 1',
                'description': "A description..."
            }
        }
        const result = validator.create(json)
        expect(result).toBe(true)
    })

    test("create, ok even with space prefix", () => {
        const json = {
            game: {
                'name': '  Item 1',
                'description': "A description..."
            }
        }
        const result = validator.create(json)
        expect(result).toBe(true)
    })

    test("create, fail with regular expression, need first character to be [A-Za-z]", () => {
        const json = {
            game: {
                'name': '0tem 1',
                'description': "A description..."
            }
        }
        const result = validator.create(json)
        expect(result).toBe(false)
    })

    test("create, spell missing", () => {
        const json = {
            game: {
                'nam_': 'Item 2'
            }
        }
        const result = validator.create(json)
        expect(result).toBe(false)
    })

    test("create, input is not exists", () => {
        const json = null
        const result = validator.create(json)
        expect(result).toBe(false)
    })

    // ----------------------------------------------------------------------

    test("update, ok", () => {
        const json = {
            game: {
                'name': 'New Item 0',
                'description': ""
            }
        }
        const result = validator.update(json)
        expect(result).toBe(true)
    })

    test("update, ok but no matter", () => {
        const json = {
            game: {
                'name_': 'New Item 1'
            }
        }
        const result = validator.update(json)
        expect(result).toBe(true)
    })

    test("update, ok even with space prefix", () => {
        const json = {
            game: {
                'name': '  Item 1',
                'description': "A description..."
            }
        }
        const result = validator.update(json)
        expect(result).toBe(true)
    })

    test("update, fail with regular expression, need first character to be [A-Za-z]", () => {
        const json = {
            game: {
                'name': '0tem 1',
                'description': "A description..."
            }
        }
        const result = validator.update(json)
        expect(result).toBe(false)
    })

    test("update, error without game", () => {
        const json = {
            gam_: {
                'name': 'New Item 2'
            }
        }
        const result = validator.update(json)
        expect(result).toBe(false)
    })

})
