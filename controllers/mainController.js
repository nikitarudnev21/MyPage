const Person = require("../models/person");
exports.fetchPersonData = (req,res) => {
    Person.readData(person=> {
        res.render('index.ejs', {persons: person.peoples});
    });
}