const Joi  = require('joi');

const productValidation = Joi.object({
    productName : Joi.string().required(),
    productImage : Joi.string().required()
})

module.exports = {
    productValidation
}