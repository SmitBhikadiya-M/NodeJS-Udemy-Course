const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../../src/models/users');
const Inventory = require('../../src/models/inventory');


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

const InventoryOneId = new mongoose.Types.ObjectId();
const InventoryOne = {
    _id: InventoryOneId,
    name: 'Inventory 1',
    category: 'Category 1',
    expiryTime: '05/07/2022 07:00:00',
    quantity: 2,
    manufacturingTime: "10/05/2022 05:00:00",
    ownerId: userOneId
}

const InventoryTwoId = new mongoose.Types.ObjectId();
const InventoryTwo = {
    _id: InventoryTwoId,
    name: 'Inventory 2',
    category: 'Category 2',
    expiryTime: '07/15/2022 07:00:00',
    quantity: 2,
    manufacturingTime: "05/05/2022 05:00:00",
    ownerId: userTwoId
}


const setupDB = async ()=>{
    await User.deleteMany();
    await Inventory.deleteMany();
    await new User(userOne).save();
    await new Inventory(InventoryOne).save();
}

module.exports = {
    userOne, userTwo, userOneId, userTwoId, InventoryOne, InventoryTwo, InventoryOneId, InventoryTwoId, setupDB
}

