const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://naikvishal:87654321@cluster0.clefo.mongodb.net/mern?retryWrites=true&w=majority"

const connectToMongo = ()=>{
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;