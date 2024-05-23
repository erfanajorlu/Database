var express = require('express');
var router = express.Router();
var cultureController = require('../controllers/cultureController');

router.get('/cultureBooks', cultureController.getAllCultureBooks);
router.get('/cultureBooks/:id', cultureController.getCultureBook);
router.put('/cultureBooks/:id', cultureController.updateCultureBook);

module.exports = router;
