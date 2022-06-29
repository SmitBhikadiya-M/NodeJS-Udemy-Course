const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error("Age must be positive number");
            }
        },
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) throw new Error("Email is invalid!!!!");
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            //if(value <= 6) throw new Error("Length must be grather than 6");
            if (value.toLowerCase().includes("password"))
                throw new Error("Password can't contain string 'password'");
        },
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});


// middleware : for authentication process
// hear we use statics methods some time its called model methods
userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });
    if(!user){
        throw new Error("Unable to login: Invalid Email");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Unable to login: Invalid Password");
    }
    return user;
}

// middleware : for jwt token
// hear we use schema methods called as instance methods
userSchema.methods.genrateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user.id.toString()}, 'NodeJsCourseByAndrew');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

// middleware: hash plain password before saving 
userSchema.pre('save', async function(next){
    const user = this;
    console.log(user.password,user.isModified('password'));
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

//create modal for set-up validation for users collection
const User = mongoose.model("User", userSchema);

module.exports = User;
