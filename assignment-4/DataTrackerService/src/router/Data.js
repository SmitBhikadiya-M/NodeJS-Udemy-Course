const express = require('express');
const auth = require('../utils/auth');
const Data = require('../models/Data');

const router = new express.Router();

router.post('/insert', auth, async (req, res)=>{
    const body = req.body;
    const allowedField = ['userId', 'requestCounter', 'messages', 'number', 'category'];
    const reqField = Object.keys(body);
    
    const isMatch = reqField.every( (field) => allowedField.includes(field) );
    if(!isMatch) return res.status(400).send({ error: 'Invalid Request!!' });

    try{
        const dataRecords = {
            userId: req.userId,
            requestId: body.requestCounter,
            category: body.category,
            userMessage: []
        };
        if(!Array.isArray(body.messages)){
            dataRecords.userMessage.push({ message: body.messages });
        }else{
            body.messages.forEach((msg)=>{ 
                dataRecords.userMessage.push({ message: msg.message });
            });
        }
        const data = await new Data(dataRecords).save();
        res.send(data); 
    }catch(e){
        res.status(500).send({error: e});
    }

});

router.get('/messages', auth, async (req, res)=>{
    const query = req.query;
    let MData = await Data.find({ userId: req.userId });
    if(query.category) MData = MData.filter(data=>data.category===query.category.toLowerCase());
    if(query.text) MData = MData.filter(data=>{
        let isvalid = false;
        data.userMessage.forEach((msg)=>{
            if(msg.message.includes(query.text)){
                isvalid = true;
                return;
            };
        })
        return isvalid;
    });
    try{
        if(query.date) MData =  MData.filter(date=>{
            const mdate = new Date(date.createdAt).toLocaleDateString();
            const cdate = new Date(query.date).toLocaleDateString();
            if(cdate=='Invalid Date' || cdate=='NAN'){
                throw ('Invalid Date Format: must be MM/DD/YYYY');
            }
            return mdate===cdate;
        });
        res.send({ resultLength: MData.length, results: MData});
    }catch(e){
        res.status(400).send({ error: e })
    }
    
});


module.exports = router;