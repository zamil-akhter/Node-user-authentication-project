const userSchema = require('../models/userSchema');

const isUserExists = async (newEmailId, newPhoneNumber) => {
  const existingUser = await userSchema.findOne({
    $or: [{ emailId: newEmailId }, { phoneNumber: newPhoneNumber }]
  });
  return existingUser;
};

const isUserMailExists = async (newEmailId) => {
  const existingUser = await userSchema.findOne(
    {emailId : newEmailId}
  )
  return existingUser;
}

module.exports = {
  isUserExists,
  isUserMailExists
};