const express = require('express')
const axios = require('axios').default
const ejs = require('ejs');
const errorPage = require('./routes/404');
const adminRoute = require('./routes/admin');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3002;
const app = express();
app.use(express.json({ extended: true }))
app.use(bodyParser.urlencoded({extended: true}));
app.set("view-engine", ejs);
app.use(express.static('public'));
app.use(adminRoute);
app.use(errorPage);

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`));