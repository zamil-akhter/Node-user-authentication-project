const userSchema = require("../models/userSchema");

const isUserExists = async (newEmailId, newPhoneNumber) => {
  try {
    const existingUser = await userSchema.findOne({
      $or: [{ emailId: newEmailId }, { phoneNumber: newPhoneNumber }],
    });
    return existingUser;
  } catch (err) {
    throw err;
  }
};

const isUserMailExists = async (newEmailId) => {
  try {
    const existingUser = await userSchema.findOne({ emailId: newEmailId });
    return existingUser;
  } catch (error) {
    throw error
  }
};

module.exports = {
  isUserExists,
  isUserMailExists,
};
