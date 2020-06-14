const express = require('express');
const router = express.Router();


const Expense = require('../models').Expenses;
const auth = require("./auth/auth");

router.post("/", auth, (req, res) => {
  Expense.create({
    userId: req.user,
    date: req.body.date,
    category: req.body.category,
    amount: req.body.amount,
    description: req.body.description
  })
  .then(expense => {
    res.json(expense);
  })
  .catch(err => {
    console.log(err);
  });
});