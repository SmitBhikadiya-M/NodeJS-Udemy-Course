require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/users');
const inventoryRouter = require('./routers/inventory');

const port = process.env.PORT;
const app = express();

// set default time zone
process.env.TZ = 'America/Chicago';

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(userRouter);
app.use(inventoryRouter);

app.get('/', (req,res)=>{
    res.send({error: "Invalid Request!!!"});
});

app.listen(port, ()=>{
    console.log('Listening On '+port);
});