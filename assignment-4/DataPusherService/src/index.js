const express = require('express');
const { client, auth } = require('./utils/auth');
const publishData = require('./rabbit/publisher');

const app = express();
const port = process.env.PORT || 3001;
app.use(express.json());

app.post('/datapush', auth, async (req, res)=>{
    try{
        const user = JSON.parse(await client.hGet('users', `users_${req.user.username}`));
        publishData({ 
            authToken: req.token,
            userId: user.userId, 
            requestCounter: user.requestCounter, 
            messages: req.body.data, 
            number: Math.floor((Math.random()*60))+1
        });
        res.send(user);
    }catch(e){
        req.status(500).send();
    }
});

app.listen(port, async ()=>{
    await client.connect();
    console.log("Listening on port "+port);
})

