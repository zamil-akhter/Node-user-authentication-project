require('dotenv').config();
const mongoose = require('mongoose');
exports.databaseConnection = async() => {
    await mongoose.connect(process.env.MONGODB_URL,{});
    console.log('Database connected successfully');
};