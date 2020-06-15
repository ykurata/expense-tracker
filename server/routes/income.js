const express = require('express');
const router = express.Router();

const Income = require('../models').Income;
const auth = require("./auth/auth");

// Create a new income
router.post("/", auth, (req, res) => {
    Income.create({
      userId: req.user,
      date: req.body.date,
      amount: req.body.amount,
      description: req.body.description
    })
    .then(income => {
      res.json(income);
    })
    .catch(err => {
      console.log(err);
    });
  });
  
  // Get all incomes
  router.get("/all", auth, (req, res) => {
    Income.findAll({
      order: [["createdAt", "DESC"]]
    })
    .then(incomes => {
      res.json(incomes);
    })
    .catch(err => {
      console.log(err);
    });
  });
  
  
  // Delete an income
  router.delete("/delete/:id", auth, (req, res) => {
    Income.findOne({ where: { id: req.params.id }})
      .then(income => {
        income.destroy();
        return res.json({ message: "Successfully deleted"});
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  module.exports = router;
