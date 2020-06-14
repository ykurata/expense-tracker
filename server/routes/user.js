const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const keys = require("../config/keys");

const User = require('../models').User;
const authentication = require("./middleware/auth");

// Import validators 
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// User register route 
router.post("/register", (req, res) => {
  // form validation 
  const { errors, isValid } = validateRegisterInput(req.body);
  // check validation 
  if (!isValid) {
    return res.status(400).json(errors);
  }
   
  User.findOne({ where: {email: req.body.email}})
    .then(user => {
      if (user) {
        return res.status(400).json({ error: "Email already exists"});
      } else {
        User.create({ 
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        })
        .then(user => {
          // create jwt payload 
          const payload = {
            id: user.id,
            name: user.username
          };

          // sign token 
          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 31556926 },  // 1 year in seconds
            (err, token) => {
              res.json({ success: true, token: token });
            }
          );
        })
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
      }
    });
});


// User login route 
router.post("/login", (req, res) => {
  // form validation 
  const { errors, isValid } = validateLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const password = req.body.password;

  User.findOne({ where: { email: req.body.email }})
    .then(user => {
      if (!user) {
        return res.status(400).json({ error: "Email not found"});
      }
      // check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // create jwt payload
          const payload = {
            id: user.id,
            name: user.username
          };
          // sign token 
          jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926}, (err, token) => {
            res.json({ success: true, token: token });
          });
        } else {
          return res.status(400).json({ error: "Password incorrect" });
        }
      });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;