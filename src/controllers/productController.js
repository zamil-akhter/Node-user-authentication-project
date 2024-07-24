const productSchema = require("../models/productSchema");
const productQuery = require("../queries/productQuery");
const commonController = require("../controllers/commonController");

const createProduct = async (req, res) => {
  try {
    // console.log(req.user);

    console.log("---------", req.user);

    const existingProductName = await commonController.isProductExists(
      req.body.productName
    );
    console.log(existingProductName);
    if (existingProductName) {
      return res.status(400).json({ message: "Product name already Exists" });
    }
    const newProduct = await productQuery.createOneProduct(productSchema, {
      ...req.body,
      userId: req.user._id,
    });
    res.status(200).json({ newProduct });
  } catch (error) {
    throw error;
  }
};

const listProduct = async (req, res) => {
  try {
    console.log(req.user._id);
    let list = await productQuery.displaySpecificProduct(productSchema, req.user._id);
    console.log('list --------------------->>>>', list);
    res.status(200).json({list})
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createProduct,
  listProduct,
};
