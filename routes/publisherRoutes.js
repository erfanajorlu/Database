var express = require('express');
var router = express.Router();
var publisherController = require('../controllers/publisherController');

router.get('/publishers', publisherController.getAllPublishers);
router.post('/publishers', publisherController.addPublisher);
router.get('/publishers/:id', publisherController.getPublisher)
router.put('/publishers/:id', publisherController.updatePublisher);
router.delete('/publishers/:id', publisherController.deletePublisher);

module.exports = router;
