const express = require('express');
const mongoose = require('mongoose');
const projectRouter = require('./routes/projectRoutes.js')
const session = require('express-session');
require('dotenv').config();

const db = process.env.BDD_URL;
const app = express();

app.use(session({secret:process.env.SECRET,saveUninitialized: true,resave: true})); // secret : à mettre dans le dot env ? le changer?
app.use(express.static('./assets'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(projectRouter);

app.listen(3000,(err)=>{
    if (err) {
       console.log(err); 
    }else{
        console.log('Connected at localhost');
    }
})

mongoose.set('strictQuery', false);
mongoose.connect(db,(err)=>{
    if (err) {
        console.log(err);
    }else{
        console.log("Connected to database");
    }
})


