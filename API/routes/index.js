const express = require('express');
const router = express.Router();
const { checkAuthenticated } = require('../services/checkAuth');

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'CNAB Docs API' });
});

router.get('/logged', checkAuthenticated, (req, res, next) => {
  res.render('logged', { title: 'CNAB Docs API' });
});



module.exports = router;
