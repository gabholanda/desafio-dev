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
            console.log(newCnabDocument);
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
    const result = await TransactionType.findAll();
    res.json(result);
}

module.exports = documentService;