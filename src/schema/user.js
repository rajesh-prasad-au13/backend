const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    confirm_password: {
        type: String,
        require: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    address: {
        type:String,
        require:true
    },
    website: {
        type:String,
        require:true
    },
    phone: {
        type:Number,
        require:true
    }
});

module.exports = mongoose.model("User", userSchema);
