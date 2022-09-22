const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bookmarkRouts = require('./server/routs/bookmarks');
const routs = require('./server/routs/router')
const path = require('path');
const bodyparser = require("body-parser");

dotenv.config({path: 'config.env'});

app.use(express.json());
app.use(bodyparser.urlencoded({ extended : true}))
app.use('/bookmarks', bookmarkRouts);
app.use('/', routs);

app.set("view engine", "ejs");
app.use('/css', express.static(path.resolve(__dirname, "assets/css")));
app.use('/img', express.static(path.resolve(__dirname, "assets/img")));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listening on port '+ PORT));

const mongoDB = process.env.DB_CONNECTION;
try{
    mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true}, ()=> {
        console.log('database connected');
    });    
}
catch(error){
    console.log(error);
}




