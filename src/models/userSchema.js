const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName : {
        type : String,
        default: null
    },
    emailId : {
        type : String,
        default : null
    },
    access_token:{
        type: String,
        default:null
    },
    phoneNumber : {
        type : Number,
        default : null
    },
    gender : {
        type : String,
        values : ["Male", "Female", "Other"],
        default : 'Other'
    },
    dateOfBirth : {
        type : Date,
        default : null
    },
    password : {
        type : String,
        default : null
    }
    // createdAt : {
    //     type : Number,
    //     default : new Date().getTime()
    // }
},{timestamps:true});
const User = mongoose.model('User', userSchema);
module.exports = User;