const express = require("express");
const User = require("../models/user");

const router = new express.Router();

/*------------- User's EndPoint ------------*/

// EndPoint: creating users
router.post('/users', async (req, res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

// EndPoint: user login
router.post('/users/login', async (req,res)=>{
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.genrateAuthToken();
        res.send({ user, token });
    }catch(e){
        res.status(400).send(e);
    }
});

// EndPoint: reading all users
router.get("/users", async (req, res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: reading perticular user by id
router.get("/users/:id", async (req, res)=>{
    const param = req.params;
    try{
        const user = await User.findById(param.id);
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: update user by its id
router.patch('/users/:id', async (req, res)=>{
    
    const id = req.params.id;

    const updates = Object.keys(req.body);
    const isValidKeys = updates.every(update => ['name', 'email', 'password', 'age'].includes(update));

    if(!isValidKeys){
        return res.status(400).send({ error: "Invalid Request" });
    }

    try{

        const user = await User.findById(id);
        updates.forEach((update) => user[update] = req.body[update]);
        await user.save();
        
        //const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

// EndPoint: delete user by its id
router.delete('/users/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).send({ error: "User is not found!!!" });
        }
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;