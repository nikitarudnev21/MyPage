const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
router.get('/admin', adminController.getAdminPage);
router.post('/admin', adminController.saveUserData);
router.delete('/admin', adminController.deleteUser);
module.exports = router;