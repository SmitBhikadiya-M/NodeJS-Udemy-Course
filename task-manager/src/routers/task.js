const express = require("express");
const Task = require("../models/task");
const auth = require("../middleware/auth");
const User = require("../models/user");

const router = new express.Router();

/*------------- Task's EndPoint ------------*/

// EndPoint: creating task
router.post('/tasks', auth, async (req, res)=>{

    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }

});

// EndPoint: reading all tasks
router.get("/tasks", auth, async (req, res)=>{

    // filtering: GET users?completed=true
    const match = {}
    if(req.query.completed){
        match.completed = req.query.completed === 'true';
    }

    // pagination: GET users?limit=10&skip=0 ( show 10 records on first page )
    const options = { limit: 2, skip: 0 }
    if(req.query.limit){
        options.limit = parseInt(req.query.limit);
    }
    if(req.query.page){
        const pageNum = parseInt(req.query.page);
        options.skip = (pageNum >= 1) ? (pageNum-1) * options.limit : 0; 
    }

    try{
        await req.user.populate({
            path: 'tasks',
            match,
            options
        }).execPopulate();
        res.send(req.user.tasks);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: reading perticular task by id
router.get("/tasks/:id", auth, async (req, res)=>{
    try{
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id});
        if(!task) return res.status(404).send();
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: update user by its id
router.patch('/tasks/:id', auth, async (req, res)=>{

    const id = req.params.id;
    const updates = Object.keys(req.body);
    const isKeyAllowed = updates.every(update => ['description', 'completed'].includes(update));

    if(!isKeyAllowed){
        return res.status(400).send({ error: "Invalid Request!!!" });
    }

    try{

        const task = await Task.findOne({ _id: id, owner: req.user._id });
        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        if(!task){
            return res.status(404).send({error: "Task is not found!!!"});
        }  
        res.send(task); 
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: delete user by its id
router.delete('/tasks/:id', auth, async (req,res)=>{
    const id = req.params.id;
    try{
        const task = await Task.findOneAndDelete({_id:id, owner: req.user._id});
        if(!task) {
            return res.status(404).send({ error: "Task is not found!!!" });
        }
        res.send(task);
    }catch(e){
        res.status(500).send(e);
    }
});

module.exports = router;