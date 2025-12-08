const mongoose = require("mongoose");

const diaryModel = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    mood: {
        type: String,
        required: [true, "Please select mood"]
    },
    content: {
        type: String,
        required: [true, "Please add some content"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{
    timestamps: true
})

module.exports = mongoose.model("Diary", diaryModel);