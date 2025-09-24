const expressAsyncHandler = require("express-async-handler")
const Expense = require("../models/expenseModel")

//@Desc - Get all expense recoreds
//@Route - GET /api/expense
//@Access - private
const getAllExpense = expressAsyncHandler(async (req, res)=>{
    const expense = await Expense.find({user_id: req.user.id})
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
        name, type, amount, user_id: req.user.id
    })

    await res.status(200).json(expense)
})

//@Desc - Get expense by passing id
//@Route - GET /api/expense/:id
//@Access - private
const getExpense = expressAsyncHandler(async (req, res)=>{
    const expense = await Expense.findById(req.params.id);
    if(!expense){
        res.status(400);
        throw new Error("Expense not found");
    }
    if(expense.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Can not get details of other users expense");
        
    }
    await res.status(200).send(expense)
})

//@Desc - Update expense
//@Route - PUT /api/expense/:id
//@Access - private
const updateExpense = expressAsyncHandler(async (req, res)=>{
    const expense = await Expense.findById(req.params.id);
    if(!expense){
        res.status(400);
        throw new Error("Expense not found");
    }
    if(expense.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Can not update details of other users expense");
        
    }
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, {new: true})

    await res.status(200).json(updatedExpense)
})

//@Desc - Delete expense
//@Route - DELETE /api/expense/:id
//@Access - private
const deleteExpense = expressAsyncHandler(async (req, res)=>{
    const expense = await Expense.findById(req.params.id);
    if(!expense){
        res.status(400);
        throw new Error("Expense not found");
    }
    if(expense.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Can not delete details of other users expense");
        
    }
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);

    await res.status(200).send(deletedExpense)
})

module.exports = {getAllExpense, createExpense, getExpense, updateExpense, deleteExpense}