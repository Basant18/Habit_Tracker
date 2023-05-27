const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    habit:{
        type: String,
        require: true
    },
    trackHistory:{
        type: []
    }
},{
    timestamps: true
});

const Habit = mongoose.model('Habit', habitSchema);
module.exports = Habit;