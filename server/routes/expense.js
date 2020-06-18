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
    res.status(200).json(newExpense);
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
    res.status(200).json(expenses);
  } catch(err) {
    console.log(err);
  }
});

// Update an expense
router.put("/update/:id", auth, (req, res) => {
  Expense.findOne({ where: {id: req.params.id}})
    .then(expense => {
      expense.update({
        date: req.body.date,
        category: req.body.category,
        amount: req.body.amount,
        description: req.body.description
      })
      res.status(200).json(expense);
    })
    .catch(err => {
      console.log(err);
    })
})


// Delete an expense
router.delete("/delete/:id", auth, (req, res) => {
  Expense.findOne({ where: { id: req.params.id }})
    .then(expense => {
      expense.destroy();
      return res.json({ message: "Successfully deleted"});
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;