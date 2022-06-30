const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

// EndPoint: creating users
router.post('/users', async (req, res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.genrateAuthToken();
        res.status(201).send({ user, token });
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

// EndPoint: user logout
router.post("/users/logout", auth, async (req, res)=>{
    try{
        req.user.tokens = req.user.tokens.filter( (token) => token.token!==req.token );
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
});

// EndPoint: all user logout
router.post('/users/logoutall', auth, async (req, res)=>{
    req.user.tokens = [];
    try{
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: reading all users
router.get("/users", auth, async (req, res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: reading my own profile
router.get('/users/me', auth ,(req, res)=>{
    res.send(req.user);
});

// EndPoint: update user by its id
router.patch('/users/me', auth, async (req, res)=>{
    
    const updates = Object.keys(req.body);
    const allowedKeys = ['name', 'email', 'password', 'age'];
    const isValidKeys = updates.every(update => allowedKeys.includes(update));

    if(!isValidKeys){
        return res.status(400).send({ error: "Invalid Request" });
    }

    try{
        updates.forEach((update) => req.user[update] = req.body[update]);
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: delete user by its id
router.delete('/users/me', auth, async (req,res)=>{
    try{
        await req.user.remove();
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;