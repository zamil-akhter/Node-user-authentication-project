const Joi = require('joi');

const userValidation = Joi.object({
  fullName: Joi.string().required(),
  email : Joi.string().email().required(),
  phoneNumber : Joi.string().regex(/^[0-9]{10,}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
  gender : Joi.string().valid('male','female','other').required(),
  dateOfBirth : Joi.date().required(),
  password : Joi.string().min(6).required()
});

const loginValidation = Joi.object({
  email : Joi.string().email().required(),
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