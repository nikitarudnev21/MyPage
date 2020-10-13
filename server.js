const express = require('express')
const axios = require('axios').default
const ejs = require('ejs');
const PORT = process.env.PORT || 3002
const app = express()
app.use(express.json({ extended: true }))

app.set("view-engine", ejs)

app.get('/', (req, res) => {
    const URL = "https://api.thevirustracker.com/free-api?countryTimeline=EE";
    axios.get(URL).then(response=>{
        let dates = Object.entries(response.data.timelineitems[0]);
        dates[dates.length-1] = undefined;
        dates = dates.filter(Boolean);
        const keys = Object.keys(response.data.timelineitems[response.data.timelineitems.length-1]);
        /*dates.forEach(d=> {
            	console.log(d[1].new_daily_cases);
        });     */ 
        res.render("index.ejs", {countryData: response.data, oct12: response.data.timelineitems[response.data.timelineitems.length-1]["10/12/20"], cDate: keys[keys.length-2], dates})
    })
    .catch(err=>console.error(err));
})

app.listen(PORT, () => {
    console.log("Server is running on Port 3002")
})