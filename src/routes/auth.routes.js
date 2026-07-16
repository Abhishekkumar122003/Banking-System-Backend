const express = require("express");
const authController  = require("../controllers/auth.controller")
const router = express.Router()

/* POST- api/v0/auth/register */
 
router.post("/register" , authController.userRegisterController);   

module.exports= router;     