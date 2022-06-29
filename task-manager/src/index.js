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

const jwt = require('jsonwebtoken');

const myFunction = async () => {
    // jwt = header (metainfo) + payload ( your data ) + signature ( use to verify )
    // genrating jwt token
    const authToken = jwt.sign( { _id: 'abcddf2132' }, 'NodeJSCourseByAndrew', { expiresIn: '7 days' } );
    const data = jwt.verify(authToken, 'NodeJSCourseByAndrew');
    console.log(data);
}

myFunction();