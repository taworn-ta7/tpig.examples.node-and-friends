'use strict'

describe("testing empty", () => {

    test("ok", () => {
        expect(true).toBe(true)
    })

    test("fail", () => {
        expect(false).toBe(false)
    })

    test("unexpect, it produce error", () => {
        expect(false).toBe(true)
    })

})
