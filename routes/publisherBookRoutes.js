var express = require('express');
var router = express.Router();
var publishBookController = require('../controllers/publishBookController');

router.get('/publishBooks', publishBookController.getAllpublishBook);
router.post('/publishBooks', publishBookController.addpublishBook);
router.get('/publishBooks/:id', publishBookController.getpublishBook)
router.put('/publishBooks/:id', publishBookController.updatepublishBook);
router.delete('/publishBooks/:id', publishBookController.deletepublishBook);

module.exports = router;
