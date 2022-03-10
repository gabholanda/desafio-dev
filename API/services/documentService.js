const fileParser = require('../utils/fileParser');
const calculateTotal = require('../utils/total');
const { CnabDocument, TransactionType } = require('../models/index');
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
            newCnabDocument.id = `${newCnabDocument.card}:${newCnabDocument.ocurrenceDate}:${newCnabDocument.value}`
            cnabDocuments.push(newCnabDocument);
        });
        const result = await CnabDocument.bulkCreate(cnabDocuments);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

documentService.getTransactionTypes = async (req, res, next) => {
    try {
        const result = await TransactionType.findAll();
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json(error);
    }
}

documentService.getCnabDocuments = async (req, res, next) => {
    try {
        const result = await CnabDocument.findAll({ include: TransactionType });
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
            },
            include: TransactionType
        });
        const documentsData = documents.map(document => {
            return {
                document: document.dataValues,
                TransactionType: document.dataValues.TransactionType.dataValues
            }
        })
        const totalBalance = documentsData.reduce((prev, current) => {
            return calculateTotal(prev, current.document.value, current.TransactionType.symbol)
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