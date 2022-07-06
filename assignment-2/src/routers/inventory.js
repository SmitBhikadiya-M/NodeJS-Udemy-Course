const express = require('express');
const mongoose = require('mongoose');
const setTimeZone = require('../middleware/setTimeZone');
const uploadImage = require('../middleware/uploadImage');
const path = require('path');
const fs = require('fs');

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

router.post('/inventory', auth, setTimeZone, async (req, res) => {
    try{
        const inventory = new Inventory({...req.body, ownerId: req.user._id});
        await inventory.save();
        res.send(inventory);
    }catch(e){
        res.status(500).send();
    }
});

router.post('/inventory/:id/setimg', auth, uploadImage.single('image'),async (req, res) => {
    try{
        const id = req.params.id;
        const inventory = await Inventory.findOne({ _id:id, ownerId:req.user._id });
        inventory.inventoryImage = req.file.path;
        await inventory.save();
        res.send(inventory);
    }catch(e){
        res.status(500).send(e);
    }
});

router.get('/inventory/:id/image', auth, async (req, res)=>{
    try{
        const id = req.params.id;
        const inventory = await Inventory.findOne({_id:id, ownerId:req.user.id});
        if(!inventory){
            return res.status(400).send({error: "Invalid Request!!!"});
        }
        const imgAbsPath = path.join('../', inventory.inventoryImage);
        const fileBuffer = fs.readFileSync(imgAbsPath);
        res.set('Content-Type', 'image/jpeg');
        res.send(fileBuffer);
    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;