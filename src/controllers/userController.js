require("dotenv").config();
const userSchema = require("../models/userSchema");
const generateToken = require("../utils/generateToken");
const isUserExists = require('../utils/isUserExists');
const userQuery = require('../queries/userQuery');

const saveOneUser = async (req, res) => {
  try {
    
    const { fullName, emailId, phoneNumber,gender,dateOfBirth,password } = req.body;

    const existingUser = await isUserExists(emailId,phoneNumber);
    console.log("existingUser--------",existingUser)
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
    const insertedUser = await userQuery.createOneUser(newUser);
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


const loginUser = (req,res) => {
  const {emailId, password} = req.body;
  

}


module.exports = {
  saveOneUser,
  loginUser
};