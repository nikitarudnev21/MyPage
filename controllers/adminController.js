const fs = require('fs');
const path = require('path');
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'myData.json');
const Person = require('../models/person');
const shortid = require('shortid');
const mainController = require('../controllers/mainController');
exports.getAdminPage = (req,res) => {
    res.render('admin.ejs')
}
exports.saveUserData = (req,res) => {
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
                person.personInfo.id = shortid.generate();
                person.saveData();
                res.redirect('/admin');
            }
            else {
                res.status(409).send({ message: "This user is duplicated" });
            }
        }
    });
}
exports.deleteUser = (req,res) => {
    Promise.resolve(Person.deletePerson(req.body.id))
    .then(()=>{
        Person.readData(person=> {
            const getPeoples = (peoples => peoples)(person.peoples)
            Promise.resolve(getPeoples).then(data=>{
                res.status(201).send({message: 'CV was deleted', peoples: JSON.stringify(data)});
                console.log("deleted"); 
            })
        });
    })
}