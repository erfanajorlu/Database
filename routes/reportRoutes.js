var express = require('express');
var router = express.Router();
var reportsController = require('../controllers/reportsController');

router.get('/reports', reportsController.getAllLogs);
router.get('/reports/daily', reportsController.getDailyLogs);
router.get('/reports/user', reportsController.getLogsByUser);
router.get('/reports/member', reportsController.getChangesInMember);
router.get('/reports/loan', reportsController.getChangesInLoan);
router.get('/reports/employee', reportsController.getChangesInEmployee);
router.get('/reports/book', reportsController.getChangesInBook);
router.get('/reports/publisher', reportsController.getChangesInPublisher);

module.exports = router;
