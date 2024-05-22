var express = require('express');
var router = express.Router();
var memberController = require('../controllers/memberController'); // Change here

router.get('/members', memberController.getAllMembers);
router.post('/members', memberController.addMember);
router.get('/members/:id', memberController.getMember);
router.put('/members/:id', memberController.updateMember);
router.delete('/members/:id', memberController.deleteMember);

module.exports = router;
