const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../src/models/users');


const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: "Smit Bhikadiya",
    email: "sbhikadiya89@rku.ac.in",
    password: 'Smit@123',
    tokens: [
        {
            token: jwt.sign({_id:userOneId}, process.env.JWT_SECRET)
        }
    ]
}

const userTwoId = new mongoose.Types.ObjectId();
const userTwo = {
    _id: userTwoId,
    name: "Shailesh Lakhani",
    email: "slakhani@rku.ac.in",
    password: 'Shailesh@123',
    tokens: [
        {
            token: jwt.sign({_id:userTwoId}, process.env.JWT_SECRET)
        }
    ]
}

const setupDB = async ()=>{
    await User.deleteMany();
    await new User(userOne).save();
}

module.exports = {
    userOne, userTwo, userOneId, userTwoId, setupDB
}

