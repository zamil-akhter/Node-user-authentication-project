require("dotenv").config();
const userSchema = require("../models/userSchema");
const generateToken = require("../utils/generateToken");
const joi = require('joi');

const userValidation = joi.object({
  fullName: joi.string().required(),
  emailId : joi.string().email().required(),
  phoneNumber : joi.number().min(10).required(),
  gender : joi.string().valid('male','female','other').required(),
  dateOfBirth : joi.date().required(),
  password : joi.string().min(6).required()
})

const saveOneUser = async (req, res) => {
  try {

    const {error, value} = userValidation.validate(req.body);
    if(error){
      return res.status(400).json({message:error.details[0].message});
    }
    const { fullName, emailId, phoneNumber,gender,dateOfBirth,password } = req.body;
    console.log(" ------------>>>> ", req.body);
    const newUser = {
      fullName,
      emailId, 
      phoneNumber,
      gender,
      dateOfBirth,
      password
    };
    const insertedUser = await userSchema.create(newUser);
    const payload = {
      _id: insertedUser._id,
    };
    let token = await generateToken(payload);
    console.log("Account has been created");
    let update = await userSchema.findOneAndUpdate(
      { _id: insertedUser._id },
      { access_token: token }
    );
    res.status(200).json(update);
  } catch (error) {
    console.log("eee", error.message);
    res.status(400).json({ message: "Error while inserting user" });
  }
};
module.exports = {
  saveOneUser,
};
