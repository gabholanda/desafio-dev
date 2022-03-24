const sinon = require('sinon');
const assert = require('assert');
const auth = require('../../utils/checkAuth');
const { describe, it, } = require('mocha');
const request = {
    setAuth: true,
    isAuthenticated: () => request.setAuth
}
const response = {
    redirectValue: '/path',
    redirect: (value) => redirectValue = value
}

const next = () => true;

describe("checkAuthenticated method", () => {
    it("should auth and go to next middleware/callback", () => {
        sinon.spy(auth, auth.checkAuthenticated.name);
        const result = auth.checkAuthenticated(request, response, next);
        const expectedValue = true;
        assert.deepStrictEqual(result, expectedValue);
    })
    it("should not auth and redirect", () => {
        sinon.restore();
        sinon.spy(auth, auth.checkAuthenticated.name);
        const spy = sinon.spy(response, response.redirect.name);
        request.setAuth = false;
        auth.checkAuthenticated(request, response, next);
        const { args } = spy.getCall(0);
        const result = args[0];
        const expectedResult = "/auth/login";
        assert.deepStrictEqual(result, expectedResult);
    })
})

describe("checkLoggedin method", () => {
    it("should not auth and go to next middleware/callback", () => {
        sinon.restore();
        sinon.spy(auth, auth.checkLoggedIn.name);
        request.setAuth = false;
        const result = auth.checkLoggedIn(request, response, next);
        const expectedValue = true;
        assert.deepStrictEqual(result, expectedValue);
    })
    it("should auth and redirect to /logged endpoint", () => {
        sinon.restore();
        sinon.spy(auth, auth.checkLoggedIn.name);
        const spy = sinon.spy(response, response.redirect.name);
        request.setAuth = true;
        auth.checkLoggedIn(request, response, next);
        const { args } = spy.getCall(0);
        const result = args[0];
        const expectedResult = "/logged";
        assert.deepStrictEqual(result, expectedResult);
    })
})