const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require("./task");

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
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

// create ralation beetwen Task And User model
userSchema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
});

// call Static method of User models using shcema for authentication
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

// created genrateAuthTOken methods manullay for user instance
userSchema.methods.genrateAuthToken = async function(){
    const user = this;
    const token = jwt.sign({_id:user.id.toString()}, 'NodeJsCourseByAndrew');
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
}

// inbuilt to toJSON methods which only return required data
userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.password
    delete userObject.tokens

    return userObject;
}

// middleware: hash plain password before saving 
userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

// delete the tasks when user removed successfully
userSchema.pre('remove', async function(next){
    const user = this;
    await Task.deleteMany({ owner: user._id });
    next();
});

//create modal for set-up validation for users collection
const User = mongoose.model("User", userSchema);

module.exports = User;
