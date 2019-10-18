require("dotenv").load();
const jwt = require("jsonwebtoken");

export const isLoggedIn = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (payload) return next();
      return next({ status: 401, message: err });
    });
  } catch (err) {
    return next({ status: 401, message: err });
  }
};
