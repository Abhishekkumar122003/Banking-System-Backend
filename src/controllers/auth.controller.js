const userModel = require("../models/user.model");


/*
     user register controller
     routes that hit here will be 
     "POST - api/v0/auth/register"
*/
 async function userRegisterController(req , res){
    const {email , name , password}= req.body;

    // add all the logic required for signup

}


module.exports= {userRegisterController};