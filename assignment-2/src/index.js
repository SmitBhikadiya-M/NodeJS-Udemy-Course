require('./db/mongoose');
const express = require('express');

const port = process.env.PORT;
const app = express('/');

app.get('/', (req,res)=>{
    res.send("I am running..");
});

app.listen(port, ()=>{
    console.log('Listening On '+port);
});
