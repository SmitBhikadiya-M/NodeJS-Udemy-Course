const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email!!!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true, 
        minLength: 7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error("Password can't contain 'password'");
            }
        }
    }
});

const User = new mongoose.model('User', userSchema);

module.exports = User;