const userSchema = require('../models/userSchema');

const isUserExists = async (newEmailId, newPhoneNumber) => {
  const existingUser = await userSchema.findOne({
    $or: [{ emailId: newEmailId }, { phoneNumber: newPhoneNumber }]
  });
  return existingUser;
};

module.exports = isUserExists;