var express = require('express');
var router = express.Router();
var managerController = require('../controllers/managerController');

router.get('/manager', managerController.getAllManager);
router.get('/manager/:id', managerController.getManager);
router.put('/manager/:id', managerController.updateManager);

module.exports = router;
