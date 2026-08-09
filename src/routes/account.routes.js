const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const createAccountController = require

const router = express.Router();

/**
 * - POST /api/accounts
 * - Create a new account
 * - Protected Route
 */
 router.post("/", authMiddleware.authMiddleware)

module.exports = router