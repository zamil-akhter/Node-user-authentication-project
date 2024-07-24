require('dotenv').config();

const jwt = require('jsonwebtoken');
const generateUserToken = (user) => {
    try {
        const payload = {
            _id : user._id,
            email : user.email,
            fullName : user.fullName,
        }
        return jwt.sign(payload, process.env.JWT_SECRET);
    } catch (error) {
        console.log('Error while generating the Token', error);
        throw error;
    }
};

module.exports = {
    generateUserToken
};