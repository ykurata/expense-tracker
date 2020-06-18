const express = require('express');
const router = express.Router();

const Expense = require('../models').Expense;
const auth = require("./auth/auth");

// Create a new expense
router.post("/", auth, async(req, res) => {
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

// Get all expenses
router.get("/all", auth, async(req, res) => {
  try {
    const expenses = await Expense.findAll({
      order: [["createdAt", "DESC"]]
    });
    return res.status(200).json(expenses);
  } catch(err) {
    console.log(err);
  }
});

// Update an expense
router.put("/update/:id", auth, async(req, res) => {
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