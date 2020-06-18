const express = require('express');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const keys = require("../config/keys");

const User = require('../models').User;
const upload = require("./s3/upload");
const auth = require("./auth/auth");

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
router.post("/login", async(req, res) => {
  // form validation 
  const { errors, isValid } = validateLoginInput(req.body);
  // check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  // Find a user by email 
  const user = await User.findOne({ where: { email: req.body.email }});
  if (!user) {
    return res.status(400).json({ error: "Email not found"});
  }

  // Compare user's registerd password and user's typed password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ error: "Password is incorrect" });
  }

  // Create jwt payload 
  const payload = {
    id: user.id,
    name: user.username
  };

  // Create a token  
  const token = await jwt.sign(payload, keys.secretOrKey, { expiresIn: 31556926});
  if (token) {
    res.json({ success: true, token: token });
  } else {
    res.status(400).json({ error: "Login failed" });
  } 
});

// POST a user avatar 
router.post('/avatar', upload.single('avatar'), auth, async(req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.user }});
    const updatedUser = await user.update({
      avatar: req.file.location
    });
    return res.status(200).json(updatedUser);
  } catch(err) {
    res.status(400).json({ error: err });
  }
});

// GET a user by id
router.get("/:id", auth, async(req, res) => {
  try {
    const user = await User.findOne({ where: { id: req.params.id }});
    return res.status(200).json(user);
  } catch(err) {
    res.status(400).json({ error: err });
  }
});


// GET all users
router.get("/all", async(req, res) => {
  try {
    const users = await User.findAll({});
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;