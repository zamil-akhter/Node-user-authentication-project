const userSchema = require("../models/userSchema");
const tokenManager = require("../token_manager/generateToken");
const commonController = require("./commonController");
const userQuery = require("../queries/userQuery");
const responseHandler = require("../utils/responseHandler");

const signup = async (req, res) => {
  try {
    const existingUser = await commonController.isUserExists(req.body.email,req.body.phoneNumber);
    // console.log("existingUser--------", existingUser);
    if (existingUser) {
      return responseHandler.sendErrorStatus(res, 'User already exists');
    }
    const insertedUser = await userQuery.createOneUser(userSchema, req.body);
    const payload = {
      _id: insertedUser._id,
    };
    let token = tokenManager.generateUserToken(insertedUser);
    console.log("Account has been created");

    let update = await userSchema.findOneAndUpdate(
      { _id: insertedUser._id },
      { access_token: token },
      { new:true}
    );

    let refData = 
      {
        id : update._id,
        email : update.email,
        phoneNumber : update.phoneNumber,
        token : update.access_token
      }
    
    console.log(refData);
    return responseHandler.sendStatus(res, 'Signup Successfull', refData);

  } catch (error) {
    console.log("eee", error.message);
    res.status(400).json({ message: "Error while inserting user" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await commonController.isUserMailExists(email);
    // console.log(existingUser);
    if (!existingUser) {
      return responseHandler.sendErrorStatus(res,'Email does not exists');
    }

    if(password != existingUser.password){
      return responseHandler.sendErrorStatus(res,'Incorrect Password');

    }
    let token = tokenManager.generateUserToken(existingUser);
    let update = await userSchema.findOneAndUpdate(
      {_id : existingUser._id},
      {access_token : token}
    );
    let refData = 
      {
        id : update._id,
        email : update.email,
        phoneNumber : update.phoneNumber,
        token : update.access_token
      }
    
    console.log(refData);
    responseHandler.sendStatus(res, 'Login Successfull', refData);
  } 
  catch (error) {
    console.log("Error", error);
    return responseHandler.sendErrorStatus(res, "Error while login")

  }
};

module.exports = {
  signup,
  login,
};
