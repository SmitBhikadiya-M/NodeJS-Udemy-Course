const express = require('express');
require("./db/mongoose");
const User = require("./models/user");
const Task = require("./models/task");

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); 

/*------------- User's EndPoint ------------*/

// EndPoint: creating users
app.post('/users', async (req, res)=>{
    const user = new User(req.body);
    try{
        await user.save();
        res.status(201).send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

// EndPoint: reading all users
app.get("/users", async (req, res)=>{
    try{
        const users = await User.find({});
        res.send(users);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: reading perticular user by id
app.get("/users/:id", async (req, res)=>{
    const param = req.params;
    try{
        const user = await User.findById(param.id);
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: update user by its id
app.patch('/users/:id', async (req, res)=>{
    
    const id = req.params.id;

    const updates = Object.keys(req.body);
    const isValidKeys = updates.every(update => ['name', 'email', 'password', 'age'].includes(update));

    if(!isValidKeys){
        return res.status(400).send({ error: "Invalid Request" });
    }

    try{
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if(!user) return res.status(404).send();
        res.send(user);
    }catch(e){
        res.status(400).send(e);
    }
});

// EndPoint: delete user by its id
app.delete('/users/:id', async (req,res)=>{
    const id = req.params.id;
    try{
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).send({ error: "User is not found!!!" });
        }
        res.send(user);
    }catch(e){
        res.status(500).send(e);
    }
});

/*------------- Task's EndPoint ------------*/

// EndPoint: creating task
app.post('/tasks', async (req, res)=>{
    const task = new Task(req.body);
    try{
        await task.save();
        res.status(201).send(task);
    }catch(e){
        res.status(400).send(e);
    }
});

// EndPoint: reading all tasks
app.get("/tasks", async (req, res)=>{
    try{
        const tasks = await Task.find({});
        res.send(tasks);
    }catch(e){
        res.status(500).send(e);
    }
});

// EndPoint: reading perticular task by id
app.get("/tasks/:id", async (req, res)=>{
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
app.patch('/tasks/:id', async (req, res)=>{

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
app.delete('/tasks/:id', async (req,res)=>{
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

app.listen(port, ()=>{
    console.log("Server is running on "+port);
})