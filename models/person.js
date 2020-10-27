const fs = require('fs')
const path = require('path')
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'myData.json'); // mainmodule = main dir filename = server.js
module.exports = class Person {
    constructor(person) {
        this.personInfo = { ...person };
    }
    saveData() {
        fs.readFile(p, (err, fileContent) => {
            let myData = [];
            if (!err) {
                myData = JSON.parse(fileContent);
                myData.peoples.push({ ...this.personInfo });
                fs.writeFile(p, JSON.stringify(myData), err => console.log(err))
            }
        });
    }
    static readData(cb){
        fs.readFile(p, (err, fileContent) =>{
            if (err) {
                cb([]);
            }
            cb(JSON.parse(fileContent));
        });
    }
}