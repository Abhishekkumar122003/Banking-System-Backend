const mongoose = require("mongoose");


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

const accountModel = mongoose.model("account", accountSchema);

module.exports=accountModel;