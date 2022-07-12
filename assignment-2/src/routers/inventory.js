const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

const Inventory = require('../models/inventory');
const User = require('../models/users');

const setDefaultTimeZone = require('../middleware/setDefaultTimeZone');
const auth = require('../middleware/auth');
const uploadImage = require('../middleware/imageMulter');

const router = new express.Router();

router.get('/inventory', auth, async (req,res)=>{

    const query = req.query;
    const queryKeys = Object.keys(query);

    let match = { isRemoved: false };
    let tz = 'america/chicago';

    queryKeys.forEach((key)=>{
        if(key.match(/^searchBy_/)){
            match[key.replace('searchBy_', '')] = query[key];
        }else if(key==='tz'){
            tz = query[key];
        }
    });

    if(!Inventory.isTimeZoneValid(tz.toLowerCase())){
        res.status(400).send({ error: "Invalid Request!!!" });
    }

    try{
        await req.user.populate({
            path: 'inventory',
            match
        });

        if(!req.user.inventory){
            return res.status(404).send();
        }

        const inventories = req.user.inventory.map((inventory)=>{
            return inventory.convertDateToGiventTZ(tz);
        })

        res.send(req.user.inventory);
    }catch(e){
        res.status(500).send();
    }
});

router.get('/inventory/:id', auth, async(req, res) => {
    const id = req.params.id;
    try{
        const inventory = await Inventory.findOne({_id:id, ownerId:req.user.id, isRemoved: false});
        if(!inventory){
            return res.status(404).send();
        }
        res.send(inventory);
    }catch(e){
        res.status(500).send(e);
    }
});

router.post('/inventory', auth, setDefaultTimeZone, async (req, res) => {
    try{
        const inventory = new Inventory({...req.body, ownerId: req.user.id});
        await inventory.save();
        res.status(201).send(inventory);
    }catch(e){
        res.status(500).send();
    }
});

router.post('/inventory/:id/setimg', auth, uploadImage().single('image'),async (req, res) => {
    try{
        const id = req.params.id;
        const inventory = await Inventory.findOne({ _id:id, ownerId:req.user.id, isRemoved:false });
        if(!inventory){
            return res.status(404).send();
        }
        const filePath = `./src/public/img/inventory/${id.toString()}_inventory.png`;
        await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(filePath);
        inventory.inventoryImage = filePath;
        await inventory.save();
        res.send(inventory);
    }catch(e){
        res.status(500).send(e);
    }
}, (err, req, res, next) => {
    res.status(400).send({error: err.message});
});

router.get('/inventory/:id/image', auth, async (req, res)=>{
    try{
        const id = req.params.id;
        const inventory = await Inventory.findOne({_id:id, ownerId:req.user.id, isRemoved: false});
        console.log(inventory);
        if(!inventory){
            return res.status(400).send({error: "Invalid Request!!!"});
        }else if(!inventory.inventoryImage){
            return res.status(404).send();
        }
        const fileBuffer = fs.readFileSync(inventory.inventoryImage);
        res.set('Content-Type', 'image/png');
        res.send(fileBuffer);
    }catch(e){
        res.status(500).send();
    }
});

router.patch('/inventory/:id', auth, setDefaultTimeZone, async (req, res)=>{
    const id = req.params.id;
    const allwoedKeys = ['name', 'category', 'expiryTime', 'manufacturingTime', 'quantity'];
    const updateKeys = Object.keys(req.body);
    const isMatch = updateKeys.every( (key) => allwoedKeys.includes(key) );
    if(!isMatch){
        return res.status(400).send({error: 'Invalid Request!!'});
    }
    const inventory = await Inventory.findOne({_id:id, ownerId:req.user.id});
    if(!inventory){
        return res.status(400).send({error: "Invalid Request!!!"});    
    }
    updateKeys.forEach((key) => {
        inventory[key] = req.body[key];
    });
    await inventory.save();
    res.send(inventory);
});

router.patch('/inventory/:id/image', auth, uploadImage().single('image'), async (req, res) => {
    const id = req.params.id;
    try{
        const inventory = await Inventory.findOne({_id:id, ownerId:req.user.id, isRemoved:false});
        if(!inventory){
            return res.status(404).send();
        }
        if(inventory.inventoryImage){
            fs.unlinkSync(inventory.inventoryImage);
            inventory.inventoryImage = undefined;
        }
        const filePath = `./src/public/img/inventory/${id.toString()}_inventory.png`;
        await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(filePath);
        inventory.inventoryImage = filePath;
        await inventory.save();
        res.send();
    }catch(e){
        res.status(500).send();
    }
});

router.delete('/inventory/:id/image', auth, async (req, res)=>{
    const id = req.params.id;
    try{
        const inventory = await Inventory.findOne({_id:id, ownerId: req.user.id, isRemoved:false});
        if(!inventory){
            return res.status(404).send();
        }
        fs.unlinkSync(inventory.inventoryImage);
        inventory.inventoryImage = undefined;
        await inventory.save();
        res.send(inventory);
    }catch(e){
        res.status(500).send();
    }
});

router.delete('/inventory/:id', auth, async (req, res)=>{
    const id = req.params.id;
    try{
        const inventory = await Inventory.findOne({_id:id, ownerId: req.user.id, isRemoved:false});
        if(!inventory){
            return res.status(404).send();
        }
        inventory.isRemoved = true;
        if(inventory.inventoryImage){
            fs.unlinkSync(inventory.inventoryImage);
            inventory.inventoryImage = undefined;
        }
        await inventory.save();
        res.send(inventory);

    }catch(e){
        res.status(500).send();
    }
});

module.exports = router;