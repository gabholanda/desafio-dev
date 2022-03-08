const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../utils/checkAuth');
const upload = multer();
const documentService = require('../services/documentService');

router.post('/upload', upload.single('cnab'), (req, res, next) => documentService.save(req, res, next));

router.get('/transactions', (req, res, next) => documentService.getTransactionTypes(req, res, next));

module.exports = router;