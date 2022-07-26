const express = require("express");
const User = require("../models/user");
const auth = require("../middleware/auth");
const sharp = require('sharp');
const { sendEmail } = require('../emails/accounts');
const router = new express.Router();

// EndPoint: creating users
router.post('/users', async (req, res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        const token = await user.genrateAuthToken();
        await sendEmail(user.email, user.name, "<h2>Your Account Created Successfully!!</h2>");
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

// EndPoint: delete user
router.delete('/users/me', auth, async (req,res)=>{
    try{
        await req.user.remove();
        await sendEmail(req.user.email, req.user.name, "<h2>Goodbye, I hope to see back sometime soon!!!</h2>");
        res.send(req.user);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: Upload Profile Picture

const multer = require('multer');
const upload = multer({
    limits: {
       fileSize: 1048576 // 1mb = (1024*1024)
    },
    fileFilter(req, file, cb){
        if(!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error("File must be jpg, jpeg or png"));
        }
        cb(undefined, true);
    }
});

router.post('/users/me/avatar', auth,upload.single('avatar'), async (req, res)=>{
    
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;

    await req.user.save();
    res.send({ success: true, message: "Successfully Upload", user: req.user });

}, (err, req, res, next)=>{
    res.status(400).send({ success: false, message : err.message });
});

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined;
    try{
        await req.user.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
});

router.get('/users/:id/avatar', async (req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        if(!user || !user.avatar){
            throw new Error();
        }
        res.set('Content-Type', 'image/png');
        res.send(user.avatar);   
    }catch(e){
        res.status(404).send();
    }
});

module.exports = router;