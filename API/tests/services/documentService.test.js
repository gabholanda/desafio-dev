const sinon = require('sinon');
const assert = require('assert');
const { describe, it, } = require('mocha');
const DocumentService = require('../../services/documentService');


const mocks = {
    validDocument: require('../../mocks/valid-cnabdocument.json'),
    validCompanyDocuments: require('../../mocks/valid-single-company.json'),
    file: require('../../mocks/file'),
    validTransactionTypes: require('../../mocks/valid-transactiontypes.json')
}

describe("Save method suite", () => {
    let documentService = {};
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    })

    beforeEach(() => {
        documentService = new DocumentService();
    })

    afterEach(() => {
        sandbox.restore();
    })

    it("should save the document file successfully", async () => {

        sinon.stub(documentService.CnabDocument, documentService.CnabDocument.bulkCreate.name)
            .returns([mocks.validDocument]);
        sinon.spy(documentService, documentService.save.name);
        const result = await documentService.save(mocks.file, "cnab");
        const expected = [
            {
                "id": "1",
                "TransactionTypeId": 3,
                "ocurrenceDate": "2019-03-01",
                "value": 142.0,
                "CPF": "96206760174",
                "card": "753****3153",
                "hour": "15:34:53",
                "shopOwner": "JOÃO MACEDO",
                "shopName": "BAR DO JOÃO"
            }
        ]
        assert.deepStrictEqual(result, expected);
    })

    it("should fail to save the document file", async () => {
        sinon.spy(documentService, documentService.save.name);
        await assert.rejects(documentService.save({}, "cnab"), TypeError);
    })
})

describe("getTransactionTypes method suite", () => {
    let documentService = {};
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    })

    beforeEach(() => {
        documentService = new DocumentService();
    })

    afterEach(() => {
        sinon.restore();
        sandbox.restore();
    })

    it("should retrieve all transaction Types", async () => {
        sinon.stub(documentService.TransactionType, documentService.TransactionType.findAll.name)
            .returns([mocks.validTransactionTypes]);
        sinon.spy(documentService, documentService.getTransactionTypes.name);
        const result = await documentService.getTransactionTypes();
        const expected = [mocks.validTransactionTypes];
        assert.deepStrictEqual(result, expected);
    })

    it("should fail to retrieve transaction Types", async () => {
        sinon.stub(documentService.TransactionType, documentService.TransactionType.findAll.name)
            .rejects();
        sinon.spy(documentService, documentService.getTransactionTypes.name);
        await assert.rejects(documentService.getTransactionTypes(), Error);
    })
})

describe("getCnabDocuments method suites", () => {
    let documentService = {};
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    })

    beforeEach(() => {
        documentService = new DocumentService();
    })

    afterEach(() => {
        sinon.restore();
        sandbox.restore();
    })

    it("should findAll cnabDocuments", async () => {
        sinon.stub(documentService.CnabDocument, documentService.CnabDocument.findAll.name)
            .returns([mocks.validDocument])
        sinon.spy(documentService, documentService.getCnabDocuments.name);
        const result = await documentService.getCnabDocuments();
        result[0].transactionType = mocks.validTransactionTypes.find((t) => t.id === result[0].TransactionTypeId)
        const expected = mocks.validDocument
        assert.deepStrictEqual(result[0], expected);
    })

    it("should fail to retrieve cnabDocuments", async () => {
        sinon.stub(documentService.CnabDocument, documentService.CnabDocument.findAll.name)
            .rejects();
        sinon.spy(documentService, documentService.getCnabDocuments.name);
        await assert.rejects(documentService.getCnabDocuments(), Error);
    })
})

describe("getGroupedDocument method suites", () => {
    let documentService = {};
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    })

    beforeEach(() => {
        documentService = new DocumentService();
    })

    afterEach(() => {
        sinon.restore();
        sandbox.restore();
    })

    it("should findAll cnabDocuments and group it by shopname", async () => {
        sinon.stub(documentService.CnabDocument, documentService.CnabDocument.findAll.name)
            .returns([mocks.validDocument]);
        sinon.spy(documentService, documentService.getGroupedDocument.name);
        const result = await documentService.getGroupedDocument();
        const expected = mocks.validDocument;
        assert.deepStrictEqual(result[0], expected);
    })

    it("should fail to retrieve cnabDocuments", async () => {
        sinon.stub(documentService.CnabDocument, documentService.CnabDocument.findAll.name)
            .rejects();
        sinon.spy(documentService, documentService.getGroupedDocument.name);
        await assert.rejects(documentService.getGroupedDocument(), Error);
    })
})

describe("getSingleCompanyDocuments method suites", () => {
    let documentService = {};
    let sandbox;

    before(() => {
        sandbox = sinon.createSandbox();
    })

    beforeEach(() => {
        documentService = new DocumentService();
    })

    afterEach(() => {
        sinon.restore();
        sandbox.restore();
    })

    it("should findAll cnabDocuments given a shopname and return it's totalBalance", async () => {
        sinon.stub(documentService.CnabDocument, documentService.CnabDocument.findAll.name)
            .returns(mocks.validCompanyDocuments.documents);

        sinon.stub(documentService, documentService.calculateTotal.name)
            .returns(mocks.validCompanyDocuments.totalBalance);

        sinon.spy(documentService, documentService.getSingleCompanyDocuments.name);
        const result = await documentService.getSingleCompanyDocuments(mocks.validCompanyDocuments.documents[0].shopName);
        const expected = {
            "documents": [
                {
                    "dataValues": {
                        "CPF": "96206760174",
                        "TransactionType": {
                            "dataValues": {
                                "description": "Financiamento",
                                "id": 3,
                                "nature": "Saída",
                                "symbol": "-",
                            }
                        },
                        "TransactionTypeId": 3,
                        "card": "753****3153",
                        "hour": "15:34:53",
                        "id": "1",
                        "ocurrenceDate": "2019-03-01",
                        "shopName": "BAR DO JOÃO",
                        "shopOwner": "JOÃO MACEDO",
                        "value": 142,
                    }
                }
            ],
            "totalBalance": -142
        }
        assert.deepStrictEqual(result, expected);
    })

    it("should fail to retrieve cnabDocuments", async () => {
        sinon.stub(documentService.CnabDocument, documentService.CnabDocument.findAll.name)
            .rejects();
        sinon.spy(documentService, documentService.getSingleCompanyDocuments.name);
        await assert.rejects(documentService.getSingleCompanyDocuments(), Error);
    })
})