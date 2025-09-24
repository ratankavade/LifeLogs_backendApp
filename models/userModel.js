const mongoose = require("mongoose");

const userModel = mongoose.Schema({
    userName:{
        type: String,
        required: [true, "Please provide userName"]
    },
    email: {
        type: String,
        required: [true, "Please provide email"]
    },
    password: {
        type: String,
        required: [true, "Please provide password"]
    }
})

module.exports = mongoose.model("User", userModel);