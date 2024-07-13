const fs = require('fs');
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.static('public'))

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get('/api/extendedTemplates',(req,res)=>{
    const templates = JSON.parse(fs.readFileSync(__dirname+'/public/data/extendedTemplate.json'));
    return res.json({templates});
});

app.get('/api/templates',(req,res)=>{
    const templates = JSON.parse(fs.readFileSync(__dirname+'/public/data/templates.json'));
    return res.json({templates});
})

app.use((err,req, res,next) => {
    console.log(err);
    res.status(500).send("Something went wrong");
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});