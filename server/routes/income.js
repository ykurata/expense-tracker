const express = require('express');
const router = express.Router();

const Income = require('../models').Income;
const validateIncomeInput = require("../validation/income");
const auth = require("./auth/auth");

// Create a new income
router.post("/", auth, async(req, res) => {
  // form validation 
  const { errors, isValid } = validateIncomeInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  try { 
    const income  = {
      userId: req.user,
      date: req.body.date,
      amount: req.body.amount,
      description: req.body.description
    }
    const newIncome = await Income.create(income);
    return res.status(200).json(newIncome);
  } catch(err) {
    res.status(400).json({ error: err });
  }
});
	
// Update an income 
router.put("/update/:id", auth, async(req, res) => {
  // form validation 
  const { errors, isValid } = validateIncomeInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  try {
    const income = await Income.findOne({ where: {id: req.params.id}});
    const updatedIncome = await income.update({
      date: req.body.date,
      amount: req.body.amount,
      description: req.body.description
    });
    return res.status(200).json(updatedIncome);
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

// Get login user's all incomes 
router.get("/all", auth, async(req, res) => {
  try {
    const incomes = await Income.findAll({ 
      where: { userId: req.user }, 
      order: [["date", "DESC"]]
    });
    return res.status(200).json(incomes);
  } catch(err) {
    res.status(400).json(err);
  }
});

//Get a specific income by expense id
router.get("/get/:id", auth, async(req, res) => {
  try {
    const income = await Income.findOne({ where: { id: req.params.id }});
    return res.status(200).json(income);
  } catch(err) {
    console.log(err);
  }
});
  
// Delete an income
router.delete("/delete/:id", auth, async(req, res) => {
  try {
    const income = await Income.findOne({ where: { id: req.params.id }});
    await income.destroy();
    return res.json({ message: "Deleted Income" });
  } catch(err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;
