const mongoose = require("mongoose");
const accountSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:[true , "Account must be associated with a user"],
        index:true
    },
    status: {
        enum:{
            values:["ACTIVE" , "FROZEN" ,"CLOSED"],
            message:"status can be either ACTIVE, FROZEN , OR CLOSED"
        }
    },
    currency:{
        type:String,
        required:[true, "Currency is required for creating an account."],
        defoult:"INR"
    }
    }, {
        timestamps:true
    });

const accountModel = mongoose.model("account", accountSchema);

module.exports=accountModel;