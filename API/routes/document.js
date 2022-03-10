const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const jwtRequired = passport.authenticate('jwt', { session: false });
const upload = multer();
const documentService = require('../services/documentService');

router.post('/upload', jwtRequired, upload.single('cnab'), (req, res, next) => documentService.save(req, res, next));

router.get('/transactions', (req, res, next) => documentService.getTransactionTypes(req, res, next));

router.get('/getAllDocs', jwtRequired, (req, res, next) => documentService.getCnabDocuments(req, res, next));

router.get('/getSingleCompanyDocs', jwtRequired, (req, res, next) => documentService.getSingleCompanyDocuments(req, res, next));

router.get('/getGroupedDocs', jwtRequired, (req, res, next) => documentService.getGroupedDocument(req, res, next));

module.exports = router;