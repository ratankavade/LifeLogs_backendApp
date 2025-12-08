const express = require("express");
const router = express.Router();
const authHandler = require("../middlewares/authMiddleware");
const { createDiary } = require("../controllers/diaryController");

router.use(authHandler);
router.route("/").post(createDiary);

module.exports = router;
