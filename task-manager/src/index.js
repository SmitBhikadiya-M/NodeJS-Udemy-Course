const express = require('express');
require("./db/mongoose");

const Task = require("./models/task");
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

const bcrypt = require('bcrypt');

const myFunction = async () => {
    const password = "Red@123";
    const hasPassword = await bcrypt.hash(password, 8);
    const isMatch = await bcrypt.compare("Red@12", hasPassword);
    
    if(!isMatch) throw new Error("Password is not matched!!!");
    return hasPassword;
}