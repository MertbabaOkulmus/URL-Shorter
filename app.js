const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.get("/",(req,res)=>{
    res.sendFile(__dirname + "/views/index.html");
})

app.post("/",(req,res)=>{
    console.log("post request");
    res.send('sss');
})

app.listen(3000);