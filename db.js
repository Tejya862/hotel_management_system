const mongoose = require("mongoose");
require('dotenv').config();
// const MongoURL = process.env.MongoURL_Local;
const MongoURL = process.env.MongoURL;

mongoose.connect(MongoURL, {
    useNewUrlParser : true,
    useUnifiedTopology : true
});

const db = mongoose.connection;

db.on('connected', ()=>{
    console.log('Connected to MongoDB server');
});

db.on('disconnected', ()=>{
    console.log('Disconnected to MongoDB server');
});

db.on('error', (err)=>{
    console.log('MongoDB connection error:', err);
});

module.exports = db;