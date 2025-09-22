const express = require("express");
const { getAllExpense, createExpense, getExpense, updateExpense, deleteExpense } = require("../controllers/expenseController");
const router = express.Router();

router.route("/").get(getAllExpense).post(createExpense);
router.route("/:id").get(getExpense).put(updateExpense).delete(deleteExpense);


module.exports = router;