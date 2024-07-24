const express = require("express");
const userController = require("../controllers/userController");
const userValidation = require("../validation/userValidation");
const productController = require('../controllers/productController');
const auth = require('../auth/auth');
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


route.post("/signup", validate_request(userValidation.userValidation), userController.signup);
route.post('/login', validate_request(userValidation.loginValidation), userController.login);

route.post('/save',auth.validateUser, validate_request(userValidation.productValidation), productController.createProduct);
route.get('/list', auth.validateUser, productController.listProduct)


module.exports = route;