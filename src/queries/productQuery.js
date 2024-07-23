const createOneProduct = async(model,data) => {
    try {
        const newProduct = model.create(data);
        return newProduct;        
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createOneProduct
}