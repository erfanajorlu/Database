var express = require('express');
var router = express.Router();
var professionController = require('../controllers/professionController');

router.get('/professionBooks', professionController.getAllProfessionBooks);
router.get('/professionBooks/:id', professionController.getProfessionBook);
router.put('/professionBooks/:id', professionController.updateProfessionBook);

module.exports = router;
