const fileParser = require('../utils/fileParser');
const { calculateTotal } = require('../utils/total');
const models = require('../models/index');
const fillUtil = require('../utils/fillDocuments');
class DocumentService {
    constructor() {
        this.fileParser = fileParser;
        this.calculateTotal = calculateTotal;
        this.TransactionType = models.TransactionType;
        this.CnabDocument = models.CnabDocument;
        this.fillUtil = fillUtil;
    }

    async save(file, parser) {
        try {
            const textLines = file.buffer
                .toString()
                .trim()
                .split('\n');
            const cnabDocuments = [];
            this.fillUtil.fillDocuments(cnabDocuments, textLines, this.fileParser, parser);
            const result = await this.CnabDocument.bulkCreate(cnabDocuments);
            return result;
        } catch (error) {
            throw new TypeError(error);
        }
    }

    async getTransactionTypes() {
        try {
            return await this.TransactionType.findAll();
        } catch (error) {
            throw new Error(error);
        }
    }

    async getCnabDocuments() {
        try {
            return await this.CnabDocument.findAll({ include: this.TransactionType });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getGroupedDocument() {
        try {
            return await this.CnabDocument.findAll({ attributes: ['shopName'], group: 'shopName' });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getSingleCompanyDocuments(shopName) {
        try {
            const documents = await this.CnabDocument.findAll({
                where: {
                    shopName
                },
                include: this.TransactionType
            });
            const documentsData = documents.map(document => {
                return {
                    document: document.dataValues,
                    TransactionType: document.dataValues.TransactionType.dataValues
                }
            })
            const totalBalance = documentsData.reduce((prev, current) => {
                return this.calculateTotal(prev, current.document.value, current.TransactionType.symbol)
            }, 0)
            const responseData = {
                documents,
                totalBalance
            }
            return responseData
        } catch (error) {
            throw new Error(error);
        }
    }
}


module.exports = DocumentService;