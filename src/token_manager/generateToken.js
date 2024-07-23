require('dotenv').config();

const jwt = require('jsonwebtoken');
const generateToken = async(payload) => {
    try {
        let token = await jwt.sign(payload, process.env.JWT_SECRET);
        return token;
    } catch (error) {
        console.log('Error while generating the Token', error);
        throw error;
    }
};

module.exports = generateToken;