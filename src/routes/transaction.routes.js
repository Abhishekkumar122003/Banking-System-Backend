const {Router} = require('express');
const authMiddleware = require("../middleware/auth.middleware")
const transactionController = require('../controllers/transaction.controller')


const transactionRouters = Router();

/**
 * - POST /api/transactions/
 * -Create a new transaction
 */

transactionRouters.post("/", authMiddleware.authMiddleware , transactionController.createTransaction);

/**
 *  -POST /api/transaction/system/initial-funds
 *  - Create initial funds transaction from system user
 */
transactionRouters.post("/system/initial-funds", authMiddleware.authSystemMiddleware, transactionController.createTransaction)

module.exports = transactionRouters 