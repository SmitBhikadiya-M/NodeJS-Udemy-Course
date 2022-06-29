const express = require("express");
const Task = require("../models/task");

const router = new express.Router();

/*------------- Task's EndPoint ------------*/

// EndPoint: creating task
router.post('/tasks', async (req, res)=>{
    const task = new Task(req.body);
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
});

// EndPoint: reading all tasks
router.get("/tasks", async (req, res)=>{
    try{
        const tasks = await Task.find({});
        res.send(tasks);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: reading perticular task by id
router.get("/tasks/:id", async (req, res)=>{
    const param = req.params;
    try{
        const task = await Task.findById(param.id);
        if(!task) return res.status(404).send();
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: update user by its id
router.patch('/tasks/:id', async (req, res)=>{

    const id = req.params.id;
    const updates = Object.keys(req.body);
    const isKeyAllowed = updates.every(update => ['description', 'completed'].includes(update));

    if(!isKeyAllowed){
        return res.status(400).send({ error: "Invalid Request!!!" });
    }

    try{
        const task =await Task.findByIdAndUpdate(id, req.body, { new:true, runValidators:true });
        if(!task){
            return res.status(404).send({error: "Task is not found!!!"});
        }  
        res.send(task); 
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: delete user by its id
router.delete('/tasks/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        const task = await Task.findByIdAndDelete(id);
        if(!task) {
            return res.status(404).send({ error: "Task is not found!!!" });
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;