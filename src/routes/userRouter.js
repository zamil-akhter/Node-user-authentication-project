const express = require("express");
const joi = require("joi");
const userController = require("../controllers/userController");
const validaion = require("../utils/validateUser");
const route = express.Router();

const validate_request = (validation_data) => {
  return (req, res, next) => {
    const { error } = validation_data.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

route.post(
  "/saveuser",
  validate_request(validaion.userValidation),
  userController.saveOneUser
);

module.exports = route;
