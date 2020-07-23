const jwt = require("jsonwebtoken");
const config = require('../../config/keys');

module.exports = function authentication(req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error({ error: "Token is not found" });
    }
    jwt.verify(token, config.secretOrKey, (err, decoded) => {
      if (err) {
        throw new Error({ error: "Something went wrong with token" });
      } else {
        req.user = decoded.id;
        next();
      }
    });
  } catch {
    res.status(401).json({ error: "You need to Log In!" });
  }
};