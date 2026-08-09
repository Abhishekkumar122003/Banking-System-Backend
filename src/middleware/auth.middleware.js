const { default: mongoose } = require("mongoose");
const accountModel = require("../models/account.model");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

async function authMiddleware(req, res, next){
    const token = req.cookies.token || req.header.autherization?.split(" ")[1];
    
    // console.log(token)
    
    /*- if token is not present */
    if(!token){
        return res.status(400).json({
            message: "Unautherized access, token is missing"
        });
    }

    try{/* - token is present */
    const decoded = jwt.verify(token , process.env.JWT_SECRET); // it gives "userId"
    
    /* - check is the userId belong to the current userId */
    const user = await userModel.findById(decoded.userId);
          req.user=user;
          next();
    }catch(err){
        console.log(err)
        return res.status(401).json({
            message:"Unautherized access, token is invalid"
        })
    }
}

module.exports ={
                 authMiddleware
            };