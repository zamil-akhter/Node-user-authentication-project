const userSchema = require("../models/userSchema");
const generateToken = require("../token_manager/generateToken");
const commonController = require("./commonController");
const userQuery = require("../queries/userQuery");
const sendStatus = require("../utils/responseHandler");

const signup = async (req, res) => {
  try {
    const existingUser = await commonController.isUserExists(req.body.emailId,req.body.phoneNumber);
    // console.log("existingUser--------", existingUser);
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const insertedUser = await userQuery.createOneUser(userSchema, req.body);
    const payload = {
      _id: insertedUser._id,
    };
    let token = await generateToken(payload);
    console.log("Account has been created");

    let update = await userSchema.findOneAndUpdate(
      { _id: insertedUser._id },
      { access_token: token },
      { new:true}
    );

    res.status(200).json(update);
  } catch (error) {
    console.log("eee", error.message);
    res.status(400).json({ message: "Error while inserting user" });
  }
};

const login = async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const existingUser = await commonController.isUserMailExists(emailId);
    console.log(existingUser);
    if (!existingUser) {
      return sendStatus(res,400,'Invalid email');
    }

    if(password != existingUser.password){
      return sendStatus(res,400, 'Incorrect Password');
    }

    let payload = {
      _id : existingUser._id,
    }
    let token = await generateToken(payload);
    let update = await userSchema.findOneAndUpdate(
      {_id : existingUser._id},
      {access_token : token}
    )
    sendStatus(res, 200, 'Login Successfull');
  } 
  catch (error) {
    console.log("Error", error);
    return res.status(400).json({'message':'Error while login'})

  }
};

module.exports = {
  signup,
  login,
};
