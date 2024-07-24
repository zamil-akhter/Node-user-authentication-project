require("dotenv").config();
const jwt = require("jsonwebtoken");

const validateUser = (req, res, next) => {
  // console.log(req.headers);
  const token = req.headers.authorization.split(" ")[1];
  // console.log(token);
  const user = jwt.verify(token, process.env.JWT_SECRET);
  req.user = user;
  next();
};

module.exports = {
  validateUser,
};
