const express = require('express');
const router = express.Router();
const authService = require('../services/authService');

// router.get('/login', (req, res) => {
//   res.send('<a href="/auth/login"> login</a>');
// });

router.get('/login', (req, res, next) => authService.login(req, res, next));

router.get('/callback', (req, res, next) => authService.callback(req, res, next));

router.get('/logout', (req, res, next) => authService.logout(req, res, next));

router.get('/loggedin', (req, res, next) => authService.loggedin(req, res, next));

module.exports = router;
