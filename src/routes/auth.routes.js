const express = require("express");
const authController  = require("../controllers/auth.controller");
const { route } = require("./account.routes");
const router = express.Router()

/* POST- /api/auth/register */
 
router.post("/register" , authController.userRegisterController);   

/* POST/api/auth/login */
router.post("/login" , authController.userLoginController);   

/**
 * 0 POST /api/auth/logout
 */
router.post("/logout", authController.userLogoutController)

module.exports= router;     