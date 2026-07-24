const userModel = require("../models/user.model");
// require('dotenv').config();
const jwt = require('jsonwebtoken')
console.log("hii")

/** 
 *   - user register controller
 *   - routes that hit here will be 
 *  - "POST - api/v0/auth/register"
*/
async function userRegisterController(req , res){
  const {email , name , password}= req.body;
  
  // add all the logic required for signup
  const isUserExist= await userModel.findOne({
    email,
    name
  });
  if(isUserExist){
    return res.status(402).json({
      message:"user with this creadential already exist",
      status:"failed"
    })
  }
  //create the user in db
  const user = await userModel.create({
    email,password,name
  })
  // console.log(process.env.JWT_SECRET);
   const token = jwt.sign({userId: user._id} , process.env.JWT_SECRET , {expiresIn: "3d"});

}


module.exports= {userRegisterController};