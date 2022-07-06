const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/users');

const router = new express.Router();

router.get('/users', auth, async (req,res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(500).send()
    }
});

// User Registration REST API
router.post('/users', async (req, res) => {
    try{
        const user = new User(req.body);
        await user.save();
        const authToken = await user.generateAuthToken();
        res.status(201).send({user, token: authToken}); 
    }catch(e){
        res.status(400).send(e);
    }
});

// User Login REST API
router.post('/users/login', async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken();
        res.send({ user, token });
    }catch(e){
        res.status(400).send(e);
    }
});

// Read User Details
router.get('/users/me', auth, async (req, res)=>{
    res.send(req.user);
});


// User Update REST API
router.patch('/users', auth, async(req, res)=>{
    
    const allowedKeys = ['name', 'email', 'password'];
    const updates = Object.keys(req.body);

    const isMatch = updates.every((key) => allowedKeys.includes(key));

    if(!isMatch){
        return res.status(400).send({error: 'Invalid Request'});
    }

    try{
        updates.forEach((key)=> {
            req.user[key] = req.body[key];
        });
        await req.user.save();
        res.send(req.user);
    }catch(e){
        res.status(400).send();
    }
});

// User Delete REST API
router.delete('/users/me', auth, async(req, res)=>{
    try{
        await req.user.remove();
        res.send(req.user);
    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;