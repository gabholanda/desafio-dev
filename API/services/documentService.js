const fileParser = require('../utils/fileParser');
const CnabDocument = require('../models/CnabDocument');
const TransactionType = require('../models/TransactionType');

const documentService = {};

documentService.save = async (req, res, next) => {
    try {
        const { file } = req;
        const { parser } = req.body;
        const textLines = file.buffer
            .toString()
            .trim()
            .split('\n');
        const cnabDocuments = [];
        textLines.forEach(textLine => {
            const newCnabDocument = {}
            for (const key in fileParser[parser]) {
                newCnabDocument[key] = fileParser[parser][key].read(textLine);
            }
            cnabDocuments.push(newCnabDocument);
        });
        const result = await CnabDocument.bulkCreate(cnabDocuments);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

documentService.getTransactionTypes = async (req, res, next) => {
    try {
        const result = await TransactionType.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

documentService.getCnabDocuments = async (req, res, next) => {
    try {
        const result = await CnabDocument.findAll();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

documentService.getGroupedDocument = async (req, res, next) => {
    try {
        const list = await CnabDocument.findAll({ attributes: ['shopName'], group: 'shopName' });
        res.status(200).json(list);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

documentService.getSingleCompanyDocuments = async (req, res, next) => {
    try {
        const { shopName } = req.query;
        const documents = await CnabDocument.findAll({
            where: {
                shopName
            }
        });
        const documentsData = documents.map(document => document.dataValues.value)
        const totalBalance = documentsData.reduce((prev, current) => {
            return prev + current
        }, 0)
        const responseData = {
            documents,
            totalBalance
        }
        res.status(200).json(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

module.exports = documentService;