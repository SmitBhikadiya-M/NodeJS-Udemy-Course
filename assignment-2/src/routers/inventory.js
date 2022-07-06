const express = require('express');
const mongoose = require('mongoose');

const Inventory = require('../models/inventory');
const User = require('../models/users');

const auth = require('../middleware/auth');

const router = new express.Router();

router.get('/inventory', auth, async (req,res)=>{
    try{
        await req.user.populate({
            path: 'inventory'
        });
        res.send(req.user.inventory);
    }catch(e){
        res.status(500).send();
    }
});

router.post('/inventory', async (req, res) => {
    try{
        
    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;