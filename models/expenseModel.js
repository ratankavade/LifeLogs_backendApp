const mongoose = require("mongoose");

const expenseModel = mongoose.Schema({
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
    }
})

module.exports = mongoose.model("Expense", expenseModel);