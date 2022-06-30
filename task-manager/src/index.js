const express = require('express');
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
require('events').EventEmitter.defaultMaxListeners = 15;

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{
    console.log("Server is running on "+port);
});


const Task = require("./models/task");
const User = require('./models/user');

const main = async ()=>{
    
    // find task and its owner
    // const task = await Task.findById('62bd4e798495a07013062aab');
    // await task.populate('owner').execPopulate();
    // console.log(task.owner);

    // const user = await User.findById('62bd4db03c5fae6c8aa3d6e4');
    // await user.populate('tasks').execPopulate();
    // console.log(user.tasks);
}

main();