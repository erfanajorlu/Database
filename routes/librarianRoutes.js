var express = require('express');
var router = express.Router();
var librarianController = require('../controllers/librarianController');

router.get('/librarian', librarianController.getAllLibrarian);
router.get('/librarian/:id', librarianController.getLibrarian);
router.put('/librarian/:id', librarianController.updateLibrarian);

module.exports = router;
