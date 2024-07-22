const joi = require('joi');

const userValidation = joi.object({
  fullName: joi.string().required(),
  emailId : joi.string().email().required(),
  phoneNumber : joi.string().pattern(/^\d{10}$/ko).min(10).required(),
  gender : joi.string().valid('male','female','other').required(),
  dateOfBirth : joi.date().required(),
  password : joi.string().min(6).required()
});

module.exports ={
  userValidation
}