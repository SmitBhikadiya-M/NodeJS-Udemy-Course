const mongoose = require('mongoose');
const validator = require('validator');

//create modal for set-up validation for users collection
const User = mongoose.model('User', {
    name: { 
        type: String, 
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0, 
        validate(value) {
            if(value < 0){
                throw new Error("Age must be positive number");
            }
        }
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) throw new Error("Email is invalid!!!!");
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value){
            //if(value <= 6) throw new Error("Length must be grather than 6");
            if(value.toLowerCase().includes('password')) throw new Error("Password can't contain string 'password'");
        }
    }
});

module.exports = User;