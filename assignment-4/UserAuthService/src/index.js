const { app, redisDB } = require('./app');

const port = process.env.PORT || 3000;

app.listen(port, async ()=>{
    await redisDB.connect();
    console.log(`Listening on port ${port}`);
});
