// import express
const express = require('express');
const authRouter = require('./routes/auth.routes') 


//create the instance of express
const app = express();
app.use(express.json()); // it enables express to read the "req.body" data

    
app.use("api/v0/auth" , authRouter)


//import the server instance (app)

module.exports = app