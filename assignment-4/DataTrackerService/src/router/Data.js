const express = require('express');
const auth = require('../utils/auth');
const Data = require('../models/Data');

const router = new express.Router();

router.post('/insert', auth, async (req, res)=>{
    const body = req.body;
    const allowedField = ['userId', 'requestCounter', 'message', 'number', 'category'];
    const reqField = Object.keys(body);
    
    if(allowedField.length !== reqField.length) return res.status(400).send({ error: 'Invalid Request!!' });
    const isMatch = reqField.every( (field) => allowedField.includes(field) );
    if(!isMatch) return res.status(400).send({ error: 'Invalid Request!!' });

    try{
        const data = await new Data({
            userMessage: body.message,
            userId: body.userId,
            requestId: body.requestCounter,
            category: body.category
        }).save();
        res.send(data); 
    }catch(e){
        res.status(500).send({error: e});
    }

});

router.get('/messages/:bytext', auth, (req, res)=>{
    res.send("Hello");
});

router.post('/messages', auth, (req, res)=>{
    res.send("Hello");
});

module.exports = router;