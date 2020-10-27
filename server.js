const express = require('express')
const axios = require('axios').default
const ejs = require('ejs');
const errorPage = require('./routes/404');
const adminRoute = require('./routes/admin');
const mainPageRoute = require('./routes/main');
const bodyParser = require('body-parser');
const Person = require('./models/person');
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json({ extended: true }))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view-engine", ejs);
app.use(express.static('public'));
app.use(adminRoute);
app.use(mainPageRoute);
app.use(errorPage);



app.listen(PORT, async () => {

   /* Person.readData(person=> {
        const s = ((peoples) => {
            return peoples;
        })(person.peoples)
        Promise.resolve(s).then(data=>{
            res.status(201).send({message: 'CV was deleted'});
            console.log("deleted"); 
        })
    });*/

console.log(`Server is running on Port ${PORT}`);
});