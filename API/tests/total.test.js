const sinon = require('sinon');
const assert = require('assert');
const total = require('../utils/total');
const { describe, it, } = require('mocha');
const mock = [
    { value: 0, symbol: "+" },
    { value: 1, symbol: "+" },
    { value: 50, symbol: "-" },
    { value: 20, symbol: "+" }
];

describe("calculateTotal method", () => {
    it("should call method thrice given 4 items array", () => {
        const spy = sinon.spy(total, total.calculateTotal.name);
        mock.reduce((prev, current) => {
            total.calculateTotal(prev, current.value, current.symbol);
        })
        const expectedCallCount = 3;
        assert.deepStrictEqual(spy.callCount, expectedCallCount);
    })

    it("should return -29 as expected result", () => {
        {
            sinon.restore();
            const spy = sinon.spy(total, total.calculateTotal.name);

            const results = mock.reduce((prev, current) => {
                return total.calculateTotal(prev, current.value, current.symbol);
            }, 0)
            const { args } = spy.getCall(2);
            const expectedResult = -29;
            const expectedParams = Object.values({
                prev: 1,
                curr: 50,
                symbol: "-"
            });
            assert.deepStrictEqual(args, expectedParams);
            assert.deepStrictEqual(results, expectedResult);
        }
    })

    it("should use minus symbol", () => {
        sinon.restore();
        const spy = sinon.spy(total, total.calculateTotal.name);
        const result = total.calculateTotal(0, 1, "-");
        const { args } = spy.getCall(0);
        const expectedParams = Object.values({
            prev: 0,
            curr: 1,
            symbol: "-"
        });
        assert.deepStrictEqual(args, expectedParams);
        assert.deepStrictEqual(result, -1);
    })

    it("should return 0 if is invalid symbol", () => {
        sinon.restore();
        const spy = sinon.spy(total, total.calculateTotal.name);
        const result = total.calculateTotal(1, 15, "/");
        assert.deepStrictEqual(result, 0);
    })
})
