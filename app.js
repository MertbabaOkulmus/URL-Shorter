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
       var kisaLink = ojlLink[ojlLink.length-2] + Date.now().toString().substring(9,4) + ojlLink[ojlLink.length-5]
       //console.log(object)
       var yeni_kayit =new  Article({
           ojlLink:ojlLink,
           kisaLink:kisaLink
       })
       //console.log(ojlLink);
       yeni_kayit.save((err)=>{
           if(err) throw err
           //console.log(req.body);
       })
    res.json(kisaLink); // index.html burdaki veriyi respons olarak karşılayıp kısa linki ekrana yansıtacaktır
})

app.get("/:url",(req,res)=>{
    const url= req.params.url;
    console.log(url);
    Article.findOne({"kisaLink":url},(err,request)=>{
        if(err) throw err
        console.log(request.ojlLink)
        if(request.length > 0) return res.redirect(request.ojlLink);
        else return res.send("Kısa link bulunamadı!") 
    }) 
    res.sendFile(__dirname + "/views/index.html");

})

app.listen(3000);