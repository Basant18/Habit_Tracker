const Habit = require('../models/habit');

module.exports.home = async (req,res) =>{
    try {
        let habits = await Habit.find({});
        return res.render('home',{
            title: 'Habit Tracker',
            habits: habits
        });
    } catch (err) {
        console.log(err);
        return;
    }
}

// function Last7Days () {
//     var result = [];
//     for (let i=6; i>=0; i--) {
//         var d = new Date();
//         d.setDate(d.getDate() - (i+3));
//         result.push({date: d,status: 'undone'});
//     }
//     let i=0;
//     let arr = result.map(x => {return {idx: i++,date: x.date.toLocaleDateString('en-US'),status: x.status}});
//     return arr;
// }

function Last7Days () {
    var result = [];
    for (let i=6; i>=0; i--) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result.push({date: d,status: 'undone'});
    }
    let i=0;
    let arr = result.map(x => {return {idx: i++,date: x.date.toLocaleDateString('en-US'),status: x.status}});
    return arr;
}

module.exports.addHabit = async (req,res) =>{
    try{
        let arr = Last7Days();
        console.log(arr);
        let habit = await Habit.create({
            habit: req.body.habit,
            trackHistory: arr
        });
        console.log(habit);
    }catch(err){
        console.log(err);
    }
    return res.redirect('back');
}

module.exports.deleteHabit = async (req, res) =>{
    try {
        const habit = await Habit.findById(req.params.id);
        await habit.deleteOne();
        console.log(habit);
    } catch (err) {
        console.log(err);
    }
    return res.redirect('back');
}

module.exports.taskStatus = async(req,res) =>{
    try {
        const habit = await Habit.findById(req.params.id);
        let arr = habit.trackHistory;
        let endDate = new Date();
        let startDate = new Date();
        startDate.setDate(startDate.getDate() - 6);
        console.log(startDate);
        // endDate = endDate.toLocaleDateString('en-US');
        startDate = startDate.toLocaleDateString('en-US');
        for(var i=0;i<arr.length;i++)
        {
            if(arr[i].date == startDate)
            {
                break;
            }
        }
        arr.splice(0,i);
        i=0;
        let taskStatus = arr.map(x => {return {idx: i++,date: x.date,status: x.status}});
        i = taskStatus.length;
        let currDate = new Date();
        currDate.setDate(currDate.getDate() - 6);
        currDate.setDate(currDate.getDate() + i);
        console.log("curr Date => ",currDate);
        while(taskStatus.length < 7)
        {
            let date = currDate;
            taskStatus.push({idx: i,date: date.toLocaleDateString('en-US'),status: 'undone'});
            currDate.setDate(currDate.getDate() + 1);
            i++;
        }
        console.log(taskStatus);
        habit.trackHistory = taskStatus;
        habit.save();
        return res.render('tasks',{
            title: 'Tasks',
            habit: habit,
            taskStatus: taskStatus
        });
    } catch (err) {
        console.log(err);
        return;
    }
}

module.exports.taskUpdate = async(req,res) =>{
    try {
        let habit = await Habit.findById(req.query.id);
        let obj = habit.trackHistory[req.query.idx];
        if(obj.status == 'undone')
        {
            habit.trackHistory.splice(req.query.idx,1,{idx: parseInt(req.query.idx),date: obj.date,status: 'done'});
        }
        else if(obj.status == 'done')
        {
            habit.trackHistory.splice(req.query.idx,1,{idx: parseInt(req.query.idx),date: obj.date,status: 'reject'});
        }
        else
        {
            habit.trackHistory.splice(req.query.idx,1,{idx: parseInt(req.query.idx),date: obj.date,status: 'undone'});
        }
        habit.save();
    } catch (err) {
        console.log(err);
    }
    return res.redirect('back');
}