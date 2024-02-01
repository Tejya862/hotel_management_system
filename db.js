const mongoose = require("mongoose");

const MongoURL = 'mongodb://localhost:27017/hotels';

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