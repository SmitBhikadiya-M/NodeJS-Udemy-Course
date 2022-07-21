const express = require('express');
const DataModel = require('./models/Data');
const DataRouter = require('./router/Data');

const app = express();
const port = process.env.PORT || 3003;

app.use();

app.listen(port, ()=>{
    console.log(`Listning on port ${port}`);
})