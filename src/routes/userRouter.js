const express = require("express");
const userController = require("../controllers/userController");
const userValidation = require("../validation/userValidation");
const productController = require("../controllers/productController");
const auth = require("../auth/auth");
const route = express.Router();
const productSchema = require("../models/productSchema");

const validate_request = (validation_data) => {
  return (req, res, next) => {
    const { error } = validation_data.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
const productNameExistance = () => {
  return async (req, res, next) => {
    let newProductName = req.body.productName.toLowerCase();

    let oldProductName = await displaySpecificProduct(
      productSchema,
      newProductName
    );
    // if(oldProductName){
    //   throw err
    // }
    if (oldProductName != null) {
      let oldPName = oldProductName.productName.toLowerCase();
      console.log("-------old--------->", oldPName);
      console.log("-------new--------->", newProductName);

      if (newProductName === oldPName) {
        return res.status(400).json({ message: "Product Name already exists" });
      }
    }

    next();
  };
};

const displaySpecificProduct = async (model, pName) => {
  try {
    let list = await model.findOne({
      productName: { $regex: new RegExp(`^${pName}$`, "i") },
    });
    return list;
  } catch (error) {
    throw error;
  }
};

route.post(
  "/signup",
  validate_request(userValidation.userValidation),
  userController.signup
);
route.post(
  "/login",
  validate_request(userValidation.loginValidation),
  userController.login
);

route.post(
  "/save",
  auth.validateUser,
  productNameExistance(),
  validate_request(userValidation.productValidation),
  productController.createProduct
);
route.get("/list", auth.validateUser, productController.listProduct);

module.exports = route;
