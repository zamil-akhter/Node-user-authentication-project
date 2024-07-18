require("dotenv").config();
const userSchema = require("../models/userSchema");
const generateToken = require("../utils/generateToken");

const saveOneUser = async (req, res) => {
  try {
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
