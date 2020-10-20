const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const Person = require('../models/person');
router.get('/admin', adminController.getAdminPage);
router.post('/admin', (req,res)=>{
    const user = {
        firstName: req.body.name,
        lastName: req.body.lastName
    }
    const person = new Person(user);
    person.saveData();
    res.redirect('/admin');
});
module.exports = router;