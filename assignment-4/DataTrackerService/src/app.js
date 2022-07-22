const express = require('express');
require('./db/connection');
const DataRouter = require('./router/Data');

const app = express();

app.use(express.json());
app.use(DataRouter);

module.exports = { app }