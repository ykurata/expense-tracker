const express = require('express');
const router = express.Router();

const Category = require('../models').Category;
const auth = require("./auth/auth");

// POST a new category
router.post("/", auth, (req, res) => {
  
});