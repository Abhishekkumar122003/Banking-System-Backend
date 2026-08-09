const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller")

const router = express.Router();
console.log(typeof authMiddleware.authMiddleware)
console.log(typeof accountController.createAccountController)
/**
 * - POST /api/accounts
 * - Create a new account
 * - Protected Route
 */
 router.post("/",
     authMiddleware.authMiddleware,
    accountController.createAccountController
    )

module.exports = router