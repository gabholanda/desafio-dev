const DocumentService = require('../services/documentService')

class DocumentController {
    constructor() {
        this.documentService = new DocumentService();
    }

    async save(req, res) {
        try {
            const { file } = req;
            const { parser } = req.body;
            const result = await this.documentService.save(file, parser);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getTransactionTypes(req, res) {
        try {
            const result = await this.documentService.getTransactionTypes();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getCnabDocuments(req, res) {
        try {
            const result = await this.documentService.getCnabDocuments();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getSingleCompanyDocuments(req, res) {
        try {
            const { shopName } = req.query;
            const result = await this.documentService.getSingleCompanyDocuments(shopName);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

    async getGroupedDocument(req, res) {
        try {
            const result = await this.documentService.getGroupedDocument();
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
}

module.exports = DocumentController;