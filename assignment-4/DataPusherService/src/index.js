const { client, app } = require('./app');
const port = process.env.PORT || 3001;

app.listen(port, async ()=>{
    await client.connect();
    console.log("Listening on port "+port);
})

