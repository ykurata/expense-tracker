const express = require('express');
const router = express.Router();


const User = require('../models').User;
const auth = require("./auth/auth");

router.post("/", auth, (req, res) => {
  Month.create({
    userId: req.user,
    month: req.body.month,
  })
  .then(month => {
    res.json(month);
  })
  .catch(err => {
    console.log(err);
  });
});