require('./db/mongoose');
const express = require('express');
const userRouter = require('./routers/users');
const inventoryRouter = require('./routers/inventory');

const app = express();

// set default time zone
process.env.TZ = 'America/Chicago';

app.set(express.static('./public'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(userRouter);
app.use(inventoryRouter);


module.exports = app;