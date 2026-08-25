const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true, "Transaction must be associated with a from account"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true, "Transaction must be associated with a to account"],
        index:true
    },
    status:{
        type:String,
        enum:{
            value:["PADDING","COMPLETE","RESERVED"],
            message:"Status can be either PENDING , COMPLETE or REVERSED"
        },
        default:"PENDING"
    },
    account:{
        type:Number,
        required:[true,"Amount is required for creating the transaction"],
        min:[0, "Transaction amount cannot be negative"]
    },
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency Key is required for creating Transaction"],
        index:true,
        unique:true
    }
},
    {
        timestamps:true
    }    
)

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports=transactionModel;