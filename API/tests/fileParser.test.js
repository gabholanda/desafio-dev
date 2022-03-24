const sinon = require('sinon');
const assert = require('assert');
const { cnab } = require('../utils/fileParser');
const { describe, it, } = require('mocha');
const { file } = require('../mocks/fileParserMock.json');

describe("Cnab file parser method", () => {
    it("should get first digit as a transaction id", () => {
        sinon.spy(cnab.TransactionTypeId, cnab.TransactionTypeId.read.name);
        const result = cnab.TransactionTypeId.read(file[0]);
        const expectedResult = "3"
        assert.deepStrictEqual(result, expectedResult);
    })
    it("should get second digit towards nine as an ocurrence date", () => {
        sinon.spy(cnab.ocurrenceDate, cnab.ocurrenceDate.read.name);
        const result = cnab.ocurrenceDate.read(file[1]);
        const expectedResult = "2019-03-01"
        assert.deepStrictEqual(result, expectedResult);
    })
    it("should get ninth digit towards nineteen as a value", () => {
        sinon.spy(cnab.value, cnab.value.read.name);
        const result = cnab.value.read(file[2]);
        const expectedResult = 122
        assert.deepStrictEqual(result, expectedResult);
    })
    it("should get nineteenth digit towards thirty as a CPF", () => {
        sinon.spy(cnab.CPF, cnab.CPF.read.name);
        const result = cnab.CPF.read(file[3]);
        const expectedResult = "09620676017"
        assert.deepStrictEqual(result, expectedResult);
    })
    it("should get thirtieth digit towards fourty-two as a credit card number", () => {
        sinon.spy(cnab.card, cnab.card.read.name);
        const result = cnab.card.read(file[4]);
        const expectedResult = "1234****7890"
        assert.deepStrictEqual(result, expectedResult);
    })
    it("should get fourty-two digit towards fourty-eight as an hour:minute:seconds", () => {
        sinon.spy(cnab.hour, cnab.hour.read.name);
        const result = cnab.hour.read(file[5]);
        const expectedResult = "12:33:33"
        assert.deepStrictEqual(result, expectedResult);
    })
       it("should get fourty-eight digit towards sixty-two as a shop owner name", () => {
        sinon.spy(cnab.shopOwner, cnab.shopOwner.read.name);
        const result = cnab.shopOwner.read(file[6]);
        const expectedResult = "MARCOS PEREIRA"
        assert.deepStrictEqual(result, expectedResult);
    })
       it("should get rest of the digits as a shop name", () => {
        sinon.spy(cnab.shopName, cnab.shopName.read.name);
        const result = cnab.shopName.read(file[7]);
        const expectedResult = "MERCEARIA 3 IRMÃOS"
        assert.deepStrictEqual(result, expectedResult);
    })
})