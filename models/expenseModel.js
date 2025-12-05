const mongoose = require("mongoose");

const expenseModel = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name:{
        type: String,
        required: [true, "Please mention expense name"]
    },
    type:{
        type: String,
        required: [true, "Please select type of expense"]
    },
    amount:{
        type: Number,
        required: [true, "Please add amount"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("Expense", expenseModel);