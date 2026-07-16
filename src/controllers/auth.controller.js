const userModel = require("../models/user.model");


/*
     user register controller
     routes that hit here will be 
     "POST - api/v0/auth/register"
*/
 async function userRegisterController(req , res){
    const {email , name , password}= req.body;

    // add all the logic required for signup
   const isUserExist= await userModel.findOne({
     email,
     name
   });
   if(!isUserExist){
     return res.status(402).json({
          message:"user with this creadential already exist"
     })
   }

}


module.exports= {userRegisterController};