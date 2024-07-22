const userSchema = require('../models/userSchema');

const createOneUser = async(newUser) => {
    try {
        const insertedUser = await userSchema.create(newUser);
        return insertedUser;
        
    } catch (error) {
        console.log('Error while inserting a new USer', error);
        throw error;
    }    
}

module.exports = {
    createOneUser
}