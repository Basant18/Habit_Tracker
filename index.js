const express = require('express');
const app = express();
const PORT = 8000;
const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');

//middlewares
app.use(express.urlencoded({extended: true}));

app.use(express.static('./assets'));

app.use(expressLayouts);
//extract styles and scripts from the sub pages
app.set('layout extarctStyles', true);
app.set('layout extractScripts', true);
//setup the view engine
app.set('view engine', 'ejs');

//use express router
app.use('/',require('./routes'));

app.listen(PORT, function(err){
    if(err)
    {
        console.log(`Error : ${err}`);
    }
    console.log(`PORT is running on ${PORT}`);
})