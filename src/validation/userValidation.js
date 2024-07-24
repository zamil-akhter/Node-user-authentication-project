const Joi = require('joi');

const userValidation = Joi.object({
  fullName: Joi.string().required(),
  emailId : Joi.string().email().required(),
  phoneNumber : Joi.number().min(10).required(),
  gender : Joi.string().valid('male','female','other').required(),
  dateOfBirth : Joi.date().required(),
  password : Joi.string().min(6).required()
});

const loginValidation = Joi.object({
  emailId : Joi.string().email().required(),
  password : Joi.string().min(6).required(),
})

const productValidation = Joi.object({
  productName : Joi.string().required(),
  productImage : Joi.string().required()
})

module.exports = {
  userValidation,
  loginValidation,
  productValidation
}