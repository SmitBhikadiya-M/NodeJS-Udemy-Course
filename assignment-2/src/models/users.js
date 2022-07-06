const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Inventory = require('./inventory');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
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
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

userSchema.virtual('inventory', {
    path: 'Inventory',
    localField: '_id',
    foreignField: 'ownerId'
});

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email});
    if(!user){
        throw new Error("Unable to login: Invalid email or password");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        throw new Error("Unable to login: Invalid email or password");
    }
    return user;
}

userSchema.methods.generateAuthToken = async function(){
    const user = this;
    const authToken = jwt.sign({_id: user._id.toString()}, process.env.JWT_SECRET);
    user.tokens = user.tokens.concat({token: authToken});
    await user.save();
    return authToken;
}

userSchema.methods.toJSON = function(){
    const user = this;
    const userObject = user.toObject();

    delete userObject.tokens;
    delete userObject.password;

    return userObject;
}

userSchema.pre('save', async function(next){
    const user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.pre('remove', async function(next){
    const user = this;
    await Inventory.deleteMany({ ownerId: user._id });
    next();
});

const User = new mongoose.model('User', userSchema);

module.exports = User;