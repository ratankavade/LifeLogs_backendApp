const expressAsyncHandler = require("express-async-handler")
const Expense = require("../models/expenseModel")

//@Desc - Get all expense recoreds
//@Route - GET /api/expense
//@Access - private
const getAllExpense = expressAsyncHandler(async (req, res)=>{
    const expense = await Expense.find()
    await res.status(200).json(expense)
})

//@Desc - Create expense
//@Route - POST /api/expense
//@Access - private
const createExpense = expressAsyncHandler(async (req, res)=>{
    const {name, type, amount} = req.body;
    if(!name || !type || !amount){
        res.status(400)
        throw new Error("All fields are mandatory!");
    }
    const expense = Expense.create({
        name, type, amount
    })
    await res.status(200).json("New expense created", expense)
})

//@Desc - Get expense by passing id
//@Route - GET /api/expense/:id
//@Access - private
const getExpense = expressAsyncHandler(async (req, res)=>{
    await res.status(200).send("Get expense by id")
})

//@Desc - Update expense
//@Route - PUT /api/expense/:id
//@Access - private
const updateExpense = expressAsyncHandler(async (req, res)=>{
    await res.status(200).send("Update expense")
})

//@Desc - Delete expense
//@Route - DELETE /api/expense/:id
//@Access - private
const deleteExpense = expressAsyncHandler(async (req, res)=>{
    await res.status(200).send("Delete expense")
})

module.exports = {getAllExpense, createExpense, getExpense, updateExpense, deleteExpense}