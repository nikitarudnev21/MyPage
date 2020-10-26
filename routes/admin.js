const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'myData.json');
const adminController = require('../controllers/adminController');
const Person = require('../models/person');
router.get('/admin', adminController.getAdminPage);
router.post('/admin', (req, res) => {
    const person = new Person(req.body);
    const spreaded = { ...req.body };
    fs.readFile(p, (err, fileContent) => {
        let myData = [];
        let duplicate = false;
        if (!err) {
            myData = JSON.parse(fileContent);
            myData.peoples.map(people => {
                let samePropertyCount = 0;
                for (const key in people) {
                    for (const keyBody in spreaded) {
                        if (Array.isArray(people[key]) && Array.isArray(spreaded[keyBody])) {
                            let arrayMatches = 0;
                            people[key].map(p => {
                                // [1,2,3].every((n,i,arr)=>arr[i]=== new Array(1,2,3)[i])
                                if (spreaded[keyBody].every((spr, i) => spr === p[i])) {
                                    arrayMatches++;
                                }
                            });
                            if (arrayMatches === people[key].length) {
                                samePropertyCount++;
                            }
                        }
                        else {
                            people[key] === spreaded[keyBody] && samePropertyCount++;
                        }
                    }
                }
                if (samePropertyCount === Object.keys(people).length) {
                    duplicate = true;
                }
                console.log("Count", samePropertyCount);
                console.log("Length", Object.keys(people).length);
            });
            if (!duplicate) {
                person.saveData();
                res.redirect('/admin');
            }
            else {
                res.status(409).send({ message: "This user is duplicated" });
            }
        }
    });
});
module.exports = router;