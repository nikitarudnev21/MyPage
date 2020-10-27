const express = require('express');
const router = express.Router();
const mainpageController = require('../controllers/mainController');
router.get('/', mainpageController.fetchPersonData);
module.exports = router;