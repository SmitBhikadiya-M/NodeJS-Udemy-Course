const express = require('express');
require('./db/connection');
const DataRouter = require('./router/Data');

const app = express();
const port = process.env.PORT || 3002;

app.use(express.json());
app.use(DataRouter);

app.listen(port, ()=>{
    console.log(`Listning on port ${port}`);
});