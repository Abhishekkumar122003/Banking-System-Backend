const transactionModel=require('../models/transaction.model');
const ledgerModel = require('../models/ledger.model');
const accountModel=require('../models/account.model');
const emailService=require('../services/email.service');
const mongoose = require("mongoose");
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
        return res.status(400).json({
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
    const senderAccount = await accountModel.findById(fromUserAccount);
    const reciverAccount = await accountModel.findById(toUserAccount);    

    //check if the senderAccount and reciverAccount exists or not
    if(!senderAccount || !reciverAccount){
        return res.status(404).json({
            message:`One or both Account not found`
        });
    }

    if(senderAccount.status !== "ACTIVE" || reciverAccount !== "ACTIVE"){
        return res.status(400).json({
            message:"Both senderAccount and  reciverAccount must be ACTIVE to process transaction"
        })
    }
    
    /*
     * step-4 Derive sender balance from ledger
     */
    
    const balance = await senderAccount.getBalance()
    if(balance < amount){
        return res.status(400).json({
            message:`Insufficiant balance in fromAccount. Current balance is ${balance}. Requested balance is ${amount}`
        })
    }
    
    
   
    
    let transaction;
    try {

            /*
             *step-5 Create Transaction (PENDING)
            */
         
    const session = await mongoose.startSession();
        session.startTransaction();
    
    transaction = await transactionModel.create([{
        fromAccount:fromUserAccount,
        toAccount:toUserAccount,
        status:"PENDIN",
        amount:amount,
        idempotencyKey:idempotencyKey
    }], {session});

    /**
     * 6. Create DEBIT ledger entry
     */
    const debitLedgerEntry = await ledgerModel.create([{
        account:fromUserAccount,
        amount:amount,
        transaction: transaction._id,
        type:"DEBIT"
    } ] , { session })

    // await (() => {
    //     return new Promise((resolve) => setTimeout(resolve, 15*1000));
    // })();

        /**
         * 7. Create CREDIT ledger entry
         */

    const creditLedgerEntry = await ledgerModel.create([{
        account:toUserAccount,
        amount,
        transaction:transaction._id,
        type:"CREDIT"
    } ] , { session })

     /**
      * 8. Mark transaction COMPLETED
      */
     transaction.status="COMPLETED";
     await transaction.save({ session });

    await session.commitTransaction();
    session.endSession();              //asked gpt about it
     
    

    }catch(error){
        return res.status(400).json({
            message: "Trasaction is Pending due to some issue, please retry after sometime"
        })
    }

    /**
     * 9. Send email notification 
     */
    await emailService.sendTransactionEmail(
        req.user.email,
        req.user.name,
        amount, 
        toUserAccount
    )

    return res.status(201).json({
        message:"Transaction completed successfully",
        transaction:transaction
    })

    }
