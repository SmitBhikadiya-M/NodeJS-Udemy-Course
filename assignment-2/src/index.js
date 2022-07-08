const app = require('./app');

const port = process.env.PORT;

app.get('/', (req,res)=>{
    res.send({error: "Invalid Request!!!"});
});

app.listen(port, ()=>{
    console.log('Listening on port '+port);
});