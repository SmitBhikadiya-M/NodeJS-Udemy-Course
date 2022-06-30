const express = require('express');
require("./db/mongoose");

const userRouter = require("./routers/user");
const taskRouter = require("./routers/task");
const { json } = require('express');
require('events').EventEmitter.defaultMaxListeners = 15;

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(userRouter);
app.use(taskRouter);

app.listen(port, ()=>{
    console.log("Server is running on "+port);
});

const pet = {
    name: "Hal"
}



console.log(JSON.stringify(pet));