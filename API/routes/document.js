const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const jwtRequired = passport.authenticate('jwt', { session: false });
const upload = multer();
const DocumentController = require('../controllers/documentController');
const documentController = new DocumentController();

router.post('/upload', jwtRequired, upload.single('cnab'), async (req, res, next) => documentController.save(req, res));

router.get('/transactions', (req, res, next) => documentController.getTransactionTypes(req, res, next));

router.get('/getAllDocs', jwtRequired, (req, res, next) => documentController.getCnabDocuments(req, res, next));

router.get('/getSingleCompanyDocs', jwtRequired, (req, res, next) => documentController.getSingleCompanyDocuments(req, res, next));

router.get('/getGroupedDocs', jwtRequired, (req, res, next) => documentController.getGroupedDocument(req, res, next));

module.exports = router;