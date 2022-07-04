const express = require('express');
require("./db/mongoose");
const { sendWelcomeEmail } = require('./emails/accounts');

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

//sendWelcomeEmail("smit.bhikadiya@marutitech.com", "Smit Bhikadiya");



