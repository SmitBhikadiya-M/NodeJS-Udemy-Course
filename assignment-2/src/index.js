require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/users');
const inventoryRouter = require('./routers/inventory');

const port = process.env.PORT;
const app = express('/');

app.use(userRouter);
app.use(inventoryRouter);

app.get('/', (req,res)=>{
    res.send("I am running..");
});

app.listen(port, ()=>{
    console.log('Listening On '+port);
});
