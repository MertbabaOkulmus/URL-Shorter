const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Article = require('./models/Article');
const app = express();

const uri ="mongodb+srv://nodemongo:123@cluster0.jkyq6.mongodb.net/urlShorterDatabase?retryWrites=true&w=majority"

mongoose.connect(
    uri,
    {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true},
    (err)=>{
        console.log(err);
    }
)

app.use(bodyParser.json());

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
})

app.post("/",(req,res)=>{
   // console.log("post request");
       var ojlLink = req.body.orjinalLink
       var yeni_kayit =new  Article({
           ojlLink:ojlLink
       })
       console.log(ojlLink);
       yeni_kayit.save((err)=>{
           if(err) throw err
           console.log(req.body);
       })
    res.json();
})

app.listen(3000);