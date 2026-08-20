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
        
    }
})