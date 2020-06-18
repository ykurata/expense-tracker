const express = require('express');
const router = express.Router();

const Category = require('../models').Category;
const auth = require("./auth/auth");

// POST a new category
router.post("/", auth, async(req, res) => {
  try {
    const category = {
      userId: req.user,
      name: req.body.name,
      budget: req.body.budget
    }
    const newCategory = await Category.create(category);
    return res.status(200).json(newCategory);
  } catch(err) {
    res.status(400).json(err);
  }
});

// Update a category
router.put("/update/:id", auth, async(req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id}});
    const updatedCategory = await category.update({
      name: req.body.name,
      budget: req.body.budget
    });
    return res.status(200).json(updatedCategory);
  } catch(err) {
    res.status(400).json(err);
  }
});

// GET all categories
router.get("/all", auth, async(req, res) => {
  try {
    const categories = await Category.findAll({});
    return res.status(200).json(categories);
  } catch(err) {
    res.status(400).json({ error: err });
  }
});

// Delete a category
router.delete("/delete/:id", auth, async(req, res) => {
  try {
    const category = await Category.findOne({ where: { id: req.params.id}});
    await category.destroy();
    return res.json({ message: "Category deleted!"});
  } catch(err) {
    res.status(400).json({ error: err });
  }
});

module.exports = router;