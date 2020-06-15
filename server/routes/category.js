const express = require('express');
const router = express.Router();

const Category = require('../models').Category;
const auth = require("./auth/auth");

// POST a new category
router.post("/", auth, (req, res) => {
  Category.create({
    userId: req.user,
    name: req.body.name,
    budget: req.body.budget
  })
  .then(category => {
    res.status(200).json(category);
  })
  .catch(err => {
    res.status(400).json(err);
  });
});

// Update a category
router.put("/update/:id", auth, (req, res) => {
  Category.findOne({ where: { id: req.params.id}})
    .then(category => {
      category.update({
        name: req.body.name,
        budget: req.body.budget
      })
      res.status(200).json(category);
    })
    .catch(err => {
      console.log(err);
    });
});

// GET all categories
router.get("/all", auth, (req, res) => {
  Category.findAll({})
    .then(categories => {
      res.status(200).json(categories);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// Delete a category
router.delete("/delete/:id", auth, (req, res) => {
  Category.findOne({ where: { id: req.params.id}})
    .then(category => {
      category.destroy();
      res.json({ message: "Successfully deleted"});
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;