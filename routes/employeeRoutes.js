var express = require('express');
var router = express.Router();
var employeeController = require('../controllers/employeeController');

router.get('/employees', employeeController.getAllEmployees);
router.post('/employees', employeeController.addEmployee);
router.get('/employees/:id', employeeController.getEmployee);
router.put('/employees/:id', employeeController.updateEmployee);
router.delete('/employees/:id', employeeController.deleteEmployee);

module.exports = router;
