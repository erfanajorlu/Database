var express = require('express');
var router = express.Router();
var storyController = require('../controllers/storyController');

router.get('/storyBooks', storyController.getAllStoryBooks);
router.get('/storyBooks/:id', storyController.getStoryBook);
router.put('/storyBooks/:id', storyController.updateStoryBook);

module.exports = router;
