const transactionModel=require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const accountModel=require('../models/account.model');
const emailService=require('../services/email.service');
 
/**
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
        *1. Validate request
        *2. Validate idempotency key
        *3. Check account status
        *4. Derive sender balance from ledger
        *5. Create transaction (PENDING)
        *6. Create DEBIT ledger entry
        *7. Create CREDIT ledger entry
        *8. Mark transaction COMPLETED
        *9. Send email notification 
 */

async function createTransaction(req, res){

    const {fromUserAccount, toUserAccount, amount, idempotencyKey} = req.body;
    /**
     * step-1 validate request
     */
    if(!fromUserAccount || !toUserAccount || !amount || !idempotencyKey){
        res.status(400).json({
            message:"FromUserAccount, toUserAccount, Amount and idempotencyKey are required"
        })
    }

    
    

    }

    //resume from 2:12:01