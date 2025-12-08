const expressAsyncHandler = require("express-async-handler");
const Diary = require("../models/diaryModel");

//@Desc - Create diary
//@Route - POST /api/diary
//@Access - private
const createDiary = expressAsyncHandler(async(req, res)=> {
    const {mood, content, createdAt} = req.body;

    if(!mood || !content){
        res.send(400);
        throw new Error("All fields are mandatory");
    }

    const diary = Diary.create({
        mood,
        content,
        createdAt: createdAt || new Date(),
        user_id: req.user.id
    });

    await res.status(200).json(diary);

});

module.exports = {createDiary}