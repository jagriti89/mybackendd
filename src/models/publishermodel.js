const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema( {
    publidherId: String,
    publisherName: String,
    age:Number,
    address:String

}, { timestamps: true });

module.exports = mongoose.model('publisher', publisherSchema)
