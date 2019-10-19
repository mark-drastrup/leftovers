require("dotenv").config();
const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (payload) return next();
      return next({ status: 401, message: "You are not logged in" });
    });
  } catch (err) {
    return next({ status: 401, message: "You are not logged in" });
  }
};

const authorizeUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (payload && payload.id === parseInt(req.params.id)) return next();
      return next({ status: 401, message: "Unauthorized" });
    });
  } catch (err) {
    return next({ status: 401, message: "Unauthorized" });
  }
};

module.exports = { isLoggedIn, authorizeUser };
