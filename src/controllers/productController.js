const mongoose = require('mongoose');
const productSchema = require('../models/productSchema');
const productQuery = require('../queries/productQuery');

const createProduct = async(req,res) => {
    try {
        // console.log(req.body);
        const newProduct = await productQuery.createOneProduct(productSchema, req.body);
        res.status(200).json({newProduct,"message":"Product Created Successfully"});
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProduct,
}