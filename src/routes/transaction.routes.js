const {Router} = require('express');
const authMiddleware = require("../middleware/auth.middleware")



const transactionRouters = Router();

/**
 * - POST /api/transactions/
 * -Create a new transaction
 */

transactionRouters.post("/", authMiddleware.authMiddleware);

module.exports = transactionRouters