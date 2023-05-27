const mongoose = require('mongoose');
const env = require('./environment');

mongoose.connect(`mongodb://127.0.0.1/${env.db}`);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to mongoDB'));

db.once('open', function(){
    console.log("Connected to Database :: MongoDB");
});

module.exports = db;

