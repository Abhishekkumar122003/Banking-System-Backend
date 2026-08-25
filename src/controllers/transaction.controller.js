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

    /**
     * step-2 validate idempotencyKey
     */
    const isTransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey:idempotencyKey
    })
    
    if(isTransactionAlreadyExists){

        if(isTransactionAlreadyExists.status === "COMPLETE"){
            return res.status(200).json({
                message:"Transaction already processed",
                transaction : isTransactionAlreadyExists
            })
        }
        if(isTransactionAlreadyExists.status === "PENDING"){
            return res.status(200).json({
                message:"Transaction is still in processing"
            })
        }
        if(isTransactionAlreadyExists.status === "FAILED"){
            return res.status(500).json({
                message:"Transaction is failed, please retry"
            })
        }
        if(isTransactionAlreadyExists.status === "REVERSED"){
            return res.status(500).json({
                message:"Transaction has been reversed, please retry"
            })
        }
    }
 
    /**
     * step-3 Check Account Status
     */
    
    if(fromUserAccount.status !== "ACTIVE" || toUserAccount !== "ACTIVE"){
        return res.status(400).json({
            message:"Both fromAccount and  toAccount must be ACTIVE to process transaction"
        })
    }
    
    /*
     * step-4 Derive sender balance from ledger
     */
    const balance =await fromUserAccount.getBalance()
    
    if(balance < amount){
        res.status(400).json({
            message:`Tnsufficiant balance in fromAccount. Current balance is ${balance}. Requested balance is ${amount}`
        })
    }
    
    }
