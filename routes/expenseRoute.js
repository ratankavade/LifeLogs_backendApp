const express = require("express");
const { getAllExpense, createExpense, getExpense, updateExpense, deleteExpense, getExpenseByUserId } = require("../controllers/expenseController");
const router = express.Router();
const authHandler = require("../middlewares/authMiddleware")

router.use(authHandler);
router.route("/").get(getAllExpense).post(createExpense);
router.route("/:id").get(getExpense).put(updateExpense).delete(deleteExpense);
router.route("/user/:user_id").get(getExpenseByUserId);


module.exports = router;