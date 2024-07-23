const express = require('express');
const route = express.Router();
const productController = require('../controllers/productController');
const productValidation = require('../validation/productValidate');


const validateProduct = (validation_data) => {

    return (req, res, next) => {
        const { error } = validation_data.validate(req.body);
        if (error) {
          return res.status(400).json({ error: error.details[0].message });
        }
        next();
      };
}

route.post('/save',validateProduct(productValidation.productValidation), productController.createProduct);

module.exports = route;