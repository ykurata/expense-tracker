const express = require('express');
const router = express.Router();

const Expense = require('../models').Expense;
const validateExpenseInput = require("../validation/expense");
const auth = require("./auth/auth");

// Create a new expense
router.post("/", auth, async(req, res) => {
  // form validation 
  const { errors, isValid } = validateExpenseInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const expense = {
      userId: req.user,
      date: req.body.date,
      category: req.body.category,
      amount: req.body.amount,
      description: req.body.description
    }
    const newExpense = await Expense.create(expense);
    return res.status(200).json(newExpense);
  } catch(err) {
    console.log(err);
  }  
});

// Get login user's all expenses
router.get("/all", auth, async(req, res) => {
  try {
    const expenses = await Expense.findAll({
      where: { userId: req.user },
      order: [[ "date", "DESC" ]]
    });
    return res.status(200).json(expenses);
  } catch(err) {
    res.status(400).json(err);
  }
});

//Get a specific expense by expense id
router.get("/get/:id", auth, async(req, res) => {
  try {
    const expense = await Expense.findOne({ where: { id: req.params.id }});
    return res.status(200).json(expense);
  } catch(err) {
    console.log(err);
  }
});

// Update an expense
router.put("/update/:id", auth, async(req, res) => {
  // form validation 
  const { errors, isValid } = validateExpenseInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try {
    const expense = await Expense.findOne({ where: {id: req.params.id}});
    const updatedExpense = await expense.update({
      date: req.body.date,
      category: req.body.category,
      amount: req.body.amount,
      description: req.body.description
    });
    return res.status(200).json(updatedExpense);
  } catch(err) {
    console.log(err);
  }
});


// Delete an expense
router.delete("/delete/:id", auth, async(req, res) => {
  try {
    const expense = await Expense.findOne({ where: { id: req.params.id }})
    await expense.destroy();
    return res.json({ message: "Deleted expense!"});
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;