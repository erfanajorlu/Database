var express = require('express');
var router = express.Router();
var bookController = require('../controllers/bookController');

router.get('/books', bookController.getAllBooks);
router.post('/books', bookController.addBook);
router.get('/books/:id', bookController.getBook)
router.put('/books/:id', bookController.updateBook);
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
