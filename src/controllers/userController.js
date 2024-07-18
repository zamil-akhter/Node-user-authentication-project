require("dotenv").config();
const userSchema = require("../models/userSchema");
const generateToken = require("../utils/generateToken");
const userValidation = require('../utils/validateUser');
const isUserExists = require('../utils/isUserExists');
const saveOneUser = async (req, res) => {
  try {
    const {error, value} = userValidation.validate(req.body);
    if(error){
      return res.status(400).json({message:error.details[0].message});
    }

    const { fullName, emailId, phoneNumber,gender,dateOfBirth,password } = req.body;
    const existingUser = await isUserExists(emailId,phoneNumber);
    if(existingUser){
      return res.status(400).json({message:"User already exists"});
    }
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
