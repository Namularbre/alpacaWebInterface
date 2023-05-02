const express = require('express');

const AlpacaController = require('../controllers/alpacaController');

let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router
    .get('/', AlpacaController.getResponse);

module.exports = router;
