 const mongoose= require("mongoose");
const transactionModel = require("./transaction.model");

 const ledgerSchema = new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Ledger must be associated with account"],
        index:true,
        immutable:true,
    },
    amount:{
        type:Number,
        required:[true,"Amount is required for creating a ledger entry"],
        immutable:true
    },
    transaction:{
        typr:mongoose.Schema.Types.ObjectId,
        required:[true, "Ledger must be associated with the Transaction"],
        immutable:true,
        index:true
    },
    type:{
        type:String,
        enum:{
            values:["CREDIT", "DEBIT"],
            message:"Type can be either CREDIT or DEBIT",
        },
        required:[true,"Ledger type is required"],
        immutable:true
    }
 });

        // logic for preventing from modification(Delete, UPDATE,FIND ect) of LEDGER 

 function preventLedgerModification(){
    throw new Error("Ledger entries are immutable and cannot be modified or Deleted");
 }
 
 ledgerSchema.pre('findOneAndUpdate',preventLedgerModification);
 ledgerSchema.pre('deleteMany',preventLedgerModification);
 ledgerSchema.pre('deleteOne',preventLedgerModification);
 ledgerSchema.pre('updateOne',preventLedgerModification);
 ledgerSchema.pre('remove',preventLedgerModification);
 ledgerSchema.pre('validate',preventLedgerModification);
 ledgerSchema.pre('findOneAndReplace',preventLedgerModification);
 ledgerSchema.pre('findOneAndDelete',preventLedgerModification);


 const ledgerModel = mongoose.model("ledger", ledgerSchema);
 
 module.exports= ledgerModel;