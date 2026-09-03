// app.js file ka kaam bss 2 chij hai 1. server ko create krrna , 2. kon kon sa "middleware"  ya "api"  mai use krr rha hu use use krrna

// import express
const express = require('express');
const cookieParser = require("cookie-parser")

//create the instance of express
const app = express();

app.use(express.json()); // it enables express to read the "req.body" data
app.use(cookieParser()); // now you can use this in any folder 

/**
 * -Routes required
 */
const authRouter = require('./routes/auth.routes') 
const accountRouter = require("./routes/account.routes")
const transactionRoutes = require("../src/routes/transaction.routes")
/**
 * -Use Routes
 */
app.get("/", (req, res) => {
    res.send("Ledger Service is up and running")
})

app.use("/api/auth" , authRouter);
app.use("/api/accounts" , accountRouter);
app.use("/api/transactions" , transactionRoutes);

//import the server instance (app)
 
module.exports = app 