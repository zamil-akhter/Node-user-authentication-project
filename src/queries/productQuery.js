const createOneProduct = async(model,data) => {
    try {
        const newProduct = model.create(data);
        return newProduct;        
    } catch (error) {
        throw error;
    }
}

const displaySpecificProduct = async(model,data) => {
    try {
        model.productName.find({ phoneNumber: "1234567890" }, { name: 1, _id: 0 })

    } catch (error) {
        
    }
}
module.exports = {
    createOneProduct
}