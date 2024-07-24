const createOneProduct = async(model,data) => {
    try {
        const newProduct = await model.create(data);
        return newProduct;        
    } catch (error) {
        throw error;
    }
}

const displaySpecificProduct = async(model,id) => {
    try {
        console.log("**********",model);
        let list = await model.find({ userId: id });
        return list;
    } catch (error) {
        throw error        
    }
}
module.exports = {
    createOneProduct,
    displaySpecificProduct
}