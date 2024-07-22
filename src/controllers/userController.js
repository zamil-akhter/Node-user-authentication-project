require("dotenv").config();
const userSchema = require("../models/userSchema");
const generateToken = require("../utils/generateToken");
const isUserExists = require("../utils/isUserExists");
const userQuery = require("../queries/userQuery");

const saveOneUser = async (req, res) => {
  try {
    const { fullName, emailId, phoneNumber, gender, dateOfBirth, password } =
      req.body;

    const existingUser = await isUserExists.isUserExists(emailId, phoneNumber);
    console.log("existingUser--------", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    console.log(" ------------>>>> ", req.body);
    const newUser = {
      fullName,
      emailId,
      phoneNumber,
      gender,
      dateOfBirth,
      password,
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

const loginUser = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const existingUser = await isUserExists.isUserMailExists(emailId);
    console.log(existingUser);
    if (!existingUser) {
      return res.status(400).json({'message':'Invalid email Id'})
    }

    if(password != existingUser.password){
      return res.status(400).json({'message':'Password is incorrect'})
    }

    let payload = {
      _id : existingUser._id,
    }

    let token = await generateToken(payload);
    let update = await userSchema.findOneAndUpdate(
      {_id : existingUser._id},
      {access_token : token}
    )

    return res.status(200).json({token,'message':'Login Successfull'})
  } 
  catch (error) {
    console.log("Error", error);
    return res.status(400).json({'message':'Error while login'})

  }
};

module.exports = {
  saveOneUser,
  loginUser,
};
