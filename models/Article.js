const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    ojlLink:String,
    kisaLink:String
})

module.exports = mongoose.model('urlShorter',UrlSchema)