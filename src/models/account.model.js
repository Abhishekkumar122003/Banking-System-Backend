const mongoose = require("mongoose");
const ledgerModel = require("./ledger.model");

const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true , "Account must be associated with a user"],
        index:true                   // this index is implemented using 
    },
    status: {
        type:String,
        enum:{
            values:["ACTIVE" , "FROZEN" ,"CLOSED"],
            message:"status can be either ACTIVE, FROZEN , OR CLOSED",
        },
        default:"ACTIVE"

    },
    currency:{
        type:String,
        required:[true, "Currency is required for creating an account."],
        default:"INR"
    }
    }, {
        timestamps:true
    });

    accountSchema.index({ user: 1, status: 1}); // this is compound index, this is used when we try to find on the basis of "user" and "status"
    accountSchema.methods.getBalance =async function(){
        const balanceData = await ledgerModel.aggregate([
            {$match: {account:this._id}},
            {$group: 
                {
                    _id:null,
                    totalCredit:{
                        $sum:{
                            $cond:[
                                {$eq:["$type", "$Credit"]},
                                "amount",
                                0
                            ]
                        }
                    },
                    totalDebit:{
                        $sum:{
                            $cond:[
                                {$eq:["$type", "$Debit"]},
                                "amount",
                                0
                            ]
                        }
                    }
                }
            },
            {
                $project:{
                    _id:0,
                    balance:{
                        $substract:["$totalCredit", "$totalDebit"]

                    }
                }
            }
        ])
        return balanceData.length > 0?balanceData[0].balance : 0;
    }
const accountModel = mongoose.model("account", accountSchema);

module.exports=accountModel;