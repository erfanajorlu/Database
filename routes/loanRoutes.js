var express = require('express');
var router = express.Router();
var loanController = require('../controllers/loanController');

router.get('/loans', loanController.getAllLoans);
router.post('/loans', loanController.addLoan);
router.get('/loans/:id', loanController.getLoan);
router.put('/loans/:id', loanController.updateLoan);
router.delete('/loans/:id', loanController.deleteLoan);

module.exports = router;
