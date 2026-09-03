const mongoose = require("mongoose");


const tokenBlacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "Token is required to blacklist"],
        unique: [true, "Token is already blacklisted"]
    },
    blacklistedAt: {
        type: Date,
        default: Date.now,
        immutable: true
    }
    }, {
        timestamps:true
    }   
);

// blacklisted token we can't stroed in database for permanent , we delete the token after a specific time  frame -> using something called -> (T T L E);
tokenBlacklistSchema.index({ blacklistedAt: 1 }, {
        expireAfterSeconds: 60 * 60 * 24 * 3 // 3 days
})

const tokenBlacklistModel = mongoose.model("tokenBlackList", tokenBlacklistSchema);

module.exports = tokenBlacklistModel;