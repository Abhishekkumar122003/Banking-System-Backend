const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const accountController = require("../controllers/account.controller")

const router = express.Router();
// console.log(typeof authMiddleware.authMiddleware)
// console.log(typeof accountController.createAccountController)
/**
 * - POST /api/accounts
 * - Create a new account
 * - Protected Route
 */
 router.post("/",
     authMiddleware.authMiddleware,
    accountController.createAccountController
    )

/**
 * - GET /api/accounts/
 * - GET all accounts of the logged-in user
 * - Protectes Route
 */
router.get("/", authMiddleware.authMiddleware, accountController.getUserAccountController);

module.exports = router