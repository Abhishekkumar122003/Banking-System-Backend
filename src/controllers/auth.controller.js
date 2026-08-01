const userModel = require("../models/user.model");
// require('dotenv').config();
const jwt = require('jsonwebtoken')

/** 
 *   - user register controller
 *   - routes that hit here will be 
 *  - "POST - api/v0/auth/register"
*/
async function userRegisterController(req , res){
  // console.log("hii there ")
  const {email , name , password}= req.body;
  // console.log(email , name, password);
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
   const token = jwt.sign({userId: user._id} , process.env.JWT_SECRET , {expiresIn: "3d"}); //this=>"3d" means token will expire in 3 days 
  res.cookie("token", token);
  res.status(201).json({
    user:{

      _id:user._id,
      email:user.email,
      name:user.name

    },
    token
  }); //send this status code accordding to REST api when some resource are creat due to user request => send=>201 
}


/**
 * - user login controller
 * - routes that hits here will be
 * - /api/auth/login
 */

async function userLoginController(req, res) {
    const {email , password} = req.body;
    const isUserExist = await userModel.findOne({email}).select("+password");
    //if user not exist
    if(!isUserExist){
      return res.status(401).json({
        message:"User with this Creadential does not Exist"
      })
    }
    //if user Exist =>check the Possword correctness.V alid
    // console.log("yaha pht rha hai")
    const isValid = await isUserExist.comparePassword(password);
    // console.log("yaha tk pht rha hai")
    //is Password is invalid
    if(!isValid){
      return res.status(401).json({
        message:"The Password is inCorrect"
      })
    }
    //if Passowrd is correct
    const token = jwt.sign({
      userId:isUserExist._id
    },
    process.env.JWT_SECRET,
    {expiresIn:"3d"}
    )
    res.cookie("token" , token);
    res.status(201).json( {
      user: {
      _id:isUserExist._id,
      name:isUserExist.name,
      email:isUserExist.email
    },
     token
})
     
}

module.exports= {userRegisterController,
  userLoginController
};