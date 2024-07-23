const productSchema = require('../models/productSchema');
const productQuery = require('../queries/productQuery');
const commonController = require('../controllers/commonController');

const createProduct = async(req,res) => {
    try {
        console.log(req.user);

        const existingProductName = await commonController.isProductExists(req.body.productName);
        if(existingProductName){
            return res.status(400).json({"message":"Product name already Exists"});
        }
        const newProduct = await productQuery.createOneProduct(productSchema, req.body);
        res.status(200).json({newProduct,"message":"Product Created Successfully"});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProduct,
}